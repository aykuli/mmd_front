import { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import MeasurementContext from "../../context"
import axios from "../../services/api"
import { IEntity, IUser } from "../../types"
import { AxiosResponse } from "axios"
import { Add, Close } from "@mui/icons-material"
import Value from "./Value"

interface IEntityResponse {
  entities: IEntity[]
}
interface AddMeasurementProps {
  open: boolean
  setOpen: (value: boolean) => void
}

interface IAddingMeasurement {
  user_id: number
  measured_at: string | number | Date | dayjs.Dayjs | null | undefined
}

interface IValue {
  value: string | null
  entity: null | IEntity
  unit: string | null
}

const initValue: IValue = {
  value: "",
  entity: null,
  unit: "",
}

const AddMeasurementModal = ({ open, setOpen }: AddMeasurementProps) => {
  const [context, setContext] = useContext(MeasurementContext)

  const [measurement, setMeasurement] = useState<IAddingMeasurement>({
    user_id: context.users[0].id,
    measured_at: dayjs(Date.now()),
  })

  const [values, setValues] = useState<IValue[]>([initValue])

  const [entities, setEntities] = useState<IEntity[]>([])
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

  const saveOneValue = async (oneValue: {
    value: string
    entity_id: number
  }) => {
    setIsSaving(true)
    try {
      await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/add`,
        { ...measurement, ...oneValue }
      )
      setContext({
        ...context,
        alert_message: `Успешно добавлено измерение для ${user.first_name}`,
        alert_type: "success",
        expandedUserId: user.id,
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const save = () => {
    values.forEach(({ value, entity }) => {
      saveOneValue({
        value: value as string,
        entity_id: (entity as IEntity).id,
      })
    })
  }

  return (
    <Dialog fullScreen onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Добавление анализа</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
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

        <div style={{ marginBottom: 16, marginTop: 12 }}>
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
        {values.map(({ value, entity, unit }, index) => {
          return (
            <>
              <div
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#dddddd",
                  marginTop: 16,
                }}
              />
              <Value
                {...{ value, entity, entities, unit }}
                onEntityChange={(newEntity) => {
                  setValues((prev) => {
                    prev[index].entity = newEntity
                    return prev
                  })
                }}
                onValueChange={(newValue) => {
                  const newValues = JSON.parse(JSON.stringify(values))
                  newValues[index] = { ...newValues[index], value: newValue }
                  setValues(newValues)
                }}
              />
            </>
          )
        })}
      </DialogContent>

      <IconButton
        onClick={() => {
          setValues([...values, initValue])
        }}
      >
        <Add />
      </IconButton>

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
