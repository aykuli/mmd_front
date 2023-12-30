import { useContext, useEffect, useState } from "react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material"
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base"
import { styled } from "@mui/system"

import MeasurementContext from "../../context"
import axios from "../../services/api"
import { IEntity, IEntityGroup } from "../../types"
import { AxiosResponse } from "axios"

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
}

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
)

interface AddEntityProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const initEntity: IEntity = {
  id: 0,
  code: "",
  title: "",
  alias: "",
  max: 0,
  min: 0,
  unit: "",
  description: "",
  gender: "",
  group_id: "",
}

const AddEntityModal = ({ open, setOpen }: AddEntityProps) => {
  const [context, setContext] = useContext(MeasurementContext)

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [entity, setEntity] = useState<IEntity>(initEntity)
  const [groups, setGroups] = useState<IEntityGroup[]>([])

  const fetchGroups = async () => {
    try {
      const response: AxiosResponse<{ entities: IEntityGroup[] }> = await axios(
        context.token
      ).post(`${String(process.env.REACT_APP_DOMAIN)}/api/v1/entities/groups`)

      setGroups(response.data.entities)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  const save = async () => {
    setIsSaving(true)
    try {
      await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/entities/add`,
        entity
      )

      setContext({
        ...context,
        alert_message: "Успешно добавлена новая сущность",
        alert_type: "success",
      })

      setOpen(false)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }
  console.log(entity)

  return (
    <Dialog fullScreen onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Новый тип анализа</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth>
          <InputLabel id="person">Группа анализа</InputLabel>
          <Select
            labelId="group"
            id="group"
            value={entity.group_id}
            defaultValue={entity.group_id}
            label="Группа анализа *"
            onChange={(e) =>
              setEntity({
                ...entity,
                group_id: e.target.value,
              })
            }
          >
            {groups.map((group: IEntityGroup) => {
              return (
                <MenuItem key={group.id} value={group.id}>
                  {group.title}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <TextField
            fullWidth
            required
            id="title"
            label="Название"
            defaultValue={entity.title}
            onChange={(e) => setEntity({ ...entity, title: e.target.value })}
          />
        </div>

        <TextField
          fullWidth
          required
          id="title"
          label="Код сущности"
          defaultValue={entity.code}
          onChange={(e) => setEntity({ ...entity, code: e.target.value })}
        />

        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <TextareaAutosize
            aria-label="description"
            placeholder="Описание"
            onChange={(e) =>
              setEntity({ ...entity, description: e.target.value })
            }
          />
        </div>

        <div style={{ marginTop: 16, marginBottom: 20 }}>
          <TextField
            fullWidth
            required
            id="unit"
            label="Единица измерения"
            defaultValue={entity.unit}
            onChange={(e) => setEntity({ ...entity, unit: e.target.value })}
          />
        </div>

        <TextField
          fullWidth
          required
          id="unit"
          label="Максимальное референсное значение"
          defaultValue={entity.max}
          onChange={(e) =>
            setEntity({ ...entity, max: Number(e.target.value) })
          }
        />

        <div style={{ marginTop: 20 }}>
          <TextField
            fullWidth
            required
            id="unit"
            label="Минимальное референсное значение"
            defaultValue={entity.max}
            onChange={(e) =>
              setEntity({ ...entity, min: Number(e.target.value) })
            }
          />
        </div>

        <FormControl>
          <FormLabel id="gender">Для кого?</FormLabel>
          <RadioGroup
            aria-labelledby="gender-value"
            defaultValue="both"
            name="gender-group"
            style={{ display: "inline" }}
            value={entity.gender}
            onChange={(e) => setEntity({ ...entity, gender: e.target.value })}
          >
            {[
              { label: "Жен", value: "female" },
              { label: "Муж", value: "male" },
              { label: "Для всех", value: "both" },
            ].map(({ label, value }) => (
              <FormControlLabel
                key={label}
                {...{ value, label }}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
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

export default AddEntityModal
