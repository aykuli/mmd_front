import { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import MeasurementContext from "../../context"
import axios from "../../services/api"

interface AddPersonProps {
  open: boolean
  setOpen: (value: boolean) => void
}
interface IPerson {
  email: string
  firstName: string
  lastName: string
  gender: string
  parent_id: number
  member: string
  birthDate: string | number | Date | dayjs.Dayjs | null | undefined
}

const members = ["мама", "папа", "брат", "сестра", "дочь", "сын"]
const initPerson: IPerson = {
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  parent_id: 0,
  member: "",
  birthDate: "",
}

const prepare = (personData: IPerson) => {
  return {
    email: personData.email,
    firstName: personData.firstName,
    lastName: personData.lastName,
    gender: personData.gender,
    parent_id: personData.parent_id,
    member: personData.member,
    birthDate: dayjs(personData.birthDate).format("YYYY-MM-DD"),
  }
}

const AddPersonModal = ({ open, setOpen }: AddPersonProps) => {
  const [context] = useContext(MeasurementContext)

  const [personData, setPersonData] = useState<IPerson>(initPerson)

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setPersonData((prev) => {
      return {
        ...prev,
        parent_id: context.parent_id,
        birthDate: dayjs(Date.now()),
      }
    })
  }, [context.parent_id])

  const savePerson = async () => {
    try {
      setIsSaving(true)
      await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/users/add`,
        {
          person: prepare(personData),
        }
      )
    } catch (e) {
      setError("Попробуй еще раз. Что-то пошло не так.")
    } finally {
      setIsSaving(false)
    }
  }

  console.log(personData)

  return (
    <Dialog fullScreen onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Добавление человека</DialogTitle>
      <DialogContent dividers>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          required
          id="first-name"
          label="Имя"
          defaultValue={personData.firstName}
          onChange={(e) =>
            setPersonData((prev) => {
              return { ...prev, firstName: e.target.value }
            })
          }
        />
        <TextField
          fullWidth
          margin="normal"
          id="last-name"
          label="Фамилия"
          defaultValue={personData.lastName}
          onChange={(e) =>
            setPersonData((prev) => {
              return { ...prev, lastName: e.target.value }
            })
          }
        />
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label="email"
          defaultValue={personData.email}
          onChange={(e) =>
            setPersonData((prev) => {
              return { ...prev, email: e.target.value }
            })
          }
        />
        <div style={{ marginBottom: 16 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Дата рождения*"
                value={personData.birthDate}
                onChange={(e) =>
                  setPersonData({
                    ...personData,
                    birthDate: dayjs(e),
                  })
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Autocomplete
            disablePortal
            freeSolo
            id="member"
            options={members}
            value={personData.member}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Член семьи"
                onChange={(e) => {
                  setPersonData((prev) => {
                    return { ...prev, member: e.target.value }
                  })
                }}
              />
            )}
            onChange={(e) =>
              setPersonData((prev) => {
                return {
                  ...prev,
                  member: e.currentTarget.textContent as string,
                }
              })
            }
          />
        </div>
        <FormControl>
          <FormLabel id="gender">Пол</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="gender-group"
            style={{ display: "inline" }}
            value={personData.gender}
            onChange={(e) =>
              setPersonData({ ...personData, gender: e.target.value })
            }
          >
            {[
              { label: "Жен", value: "female" },
              { label: "Муж", value: "male" },
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
          onClick={savePerson}
          disabled={isSaving}
        >
          {isSaving ? "Сохраняю" : "Сохранить"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddPersonModal
