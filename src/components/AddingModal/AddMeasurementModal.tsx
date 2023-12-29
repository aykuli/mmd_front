import { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"

import MeasurementContext from "../../context"
import axios from "../../services/api"
import { IEntity, IFamilyMember } from "../../types"
import { AxiosResponse } from "axios"

interface IEntityResponse {
  entities: IEntity
}
interface AddMeasurementProps {
  open: boolean
  setOpen: (value: boolean) => void
}

interface IAddingMeasurement {
  user_id: number
  entity_code: string
}

const initMeasurement = (user_id: number): IAddingMeasurement => {
  return {
    user_id,
    entity_code: "",
  }
}

const AddMeasurementModal = ({ open, setOpen }: AddMeasurementProps) => {
  const [context] = useContext(MeasurementContext)

  const [measurement, setMeasurement] = useState<IAddingMeasurement>(
    initMeasurement(context.user_id)
  )

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const fetchEntities = async () => {
    try {
      const entityData: AxiosResponse<IEntityResponse> = await axios(
        context.token
      ).post(`${String(process.env.REACT_APP_DOMAIN)}/api/v1/entities/filter`)
    } catch (e) {}
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
            label="Чьи анализы?"
            onChange={(e) =>
              setMeasurement({
                ...measurement,
                user_id: e.target.value as number,
              })
            }
          >
            {context.users.map(({ id, first_name, member }: IFamilyMember) => {
              return (
                <MenuItem key={id} value={id}>{`${first_name} ${
                  member ? `(${member})` : ""
                }`}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <div style={{ marginBottom: 16 }}>
          <Autocomplete
            disablePortal
            freeSolo
            id="member"
            options={context.entities.map(({ title }: IEntity) => title)}
            value={measurement.entity_code}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Выберите тип анализа" />
            )}
            onChange={(e) =>
              setMeasurement({
                ...measurement,
                entity_code: e.currentTarget.textContent as string,
              })
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddMeasurementModal
