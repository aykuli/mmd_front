import { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import MeasurementContext from "../../context"
import axios from "../../services/api"
import { IEntity, IUser } from "../../types"
import { AxiosResponse } from "axios"

interface IEntityResponse {
  entities: IEntity[]
}
interface AddMeasurementProps {
  open: boolean
  setOpen: (value: boolean) => void
}

interface IAddingMeasurement {
  user_id: number
  entity_id: number | null
  measured_at: string | number | Date | dayjs.Dayjs | null | undefined
  value: string
}

const AddMeasurementModal = ({ open, setOpen }: AddMeasurementProps) => {
  const [context, setContext] = useContext(MeasurementContext)

  const [measurement, setMeasurement] = useState<IAddingMeasurement>({
    user_id: context.users[0].id,
    entity_id: null,
    measured_at: dayjs(Date.now()),
    value: "",
  })

  const [entities, setEntities] = useState<IEntity[]>([])
  const [entity, setEntity] = useState<IEntity | null>(null)
  const [user, setUser] = useState<IUser>(context.users[0])
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isFetchingEntities, setIsFetchingEntities] = useState<boolean>(false)

  const fetchEntities = async () => {
    try {
      setIsFetchingEntities(true)
      const res: AxiosResponse<IEntityResponse> = await axios(
        context.token
      ).post(`${String(process.env.REACT_APP_DOMAIN)}/api/v1/entities/filter`, {
        gender: user.gender,
      })
      setEntities(res.data.entities)
    } catch (e) {
    } finally {
      setIsFetchingEntities(false)
    }
  }

  useEffect(() => {
    fetchEntities()
  }, [])

  const save = async () => {
    setIsSaving(true)
    try {
      await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/add`,
        measurement
      )
      setContext({
        ...context,
        alert_message: `Успешно добавлено измерение для ${user.first_name}`,
        alert_type: "success",
        expandedUserId: user.id,
      })
      setOpen(false)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog fullScreen onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Добавление анализа</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth>
          <InputLabel id="person">Чьи анализы?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={measurement.user_id}
            defaultValue={measurement.user_id}
            label="Чьи анализы? *"
            onChange={(e) => {
              console.log(e)
              setMeasurement({
                ...measurement,
                user_id: e.target.value as number,
              })
              setUser(context.users.find((u: IUser) => u.id === e.target.value))
            }}
          >
            {context.users.map((userOption: IUser) => {
              return (
                <MenuItem key={userOption.id} value={userOption.id}>{`${
                  userOption.first_name
                } ${
                  userOption.member ? `(${userOption.member})` : ""
                }`}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <div style={{ marginBottom: 16, marginTop: 16 }}>
          <Autocomplete
            disablePortal
            freeSolo
            id="member"
            options={entities}
            getOptionLabel={(option) => (option as IEntity).title}
            value={entity}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Выберите тип анализа *"
                onChange={(e) => {
                  console.log("777", e.target.value)
                  console.log(params)
                }}
              />
            )}
            onChange={(e, value) => {
              setEntity(value as IEntity)
              setMeasurement({
                ...measurement,
                entity_id: (value as IEntity).id,
              })
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Дата измерения *"
                value={measurement.measured_at}
                onChange={(e) =>
                  setMeasurement({
                    ...measurement,
                    measured_at: dayjs(e),
                  })
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <FormControl fullWidth>
          <TextField
            id="value"
            label="Результат измерения *"
            variant="outlined"
            onChange={(e) => {
              setMeasurement({ ...measurement, value: e.target.value })
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{entity?.unit}</InputAdornment>
              ),
            }}
          />
        </FormControl>
      </DialogContent>

      <DialogContent dividers>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={save}
          disabled={isSaving}
        >
          {isSaving ? "Сохраняю" : "Сохранить"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddMeasurementModal
