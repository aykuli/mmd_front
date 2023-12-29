import { useState } from "react"
import {
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

interface AddPersonProps {
  open: boolean
  setOpen: (value: boolean) => void
}
const members = ["мама", "папа", "брат", "сестра", "дочь", "сын"]
const AddPersonModal = ({ open, setOpen }: AddPersonProps) => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  return (
    <Dialog fullScreen onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Добавление человека</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          required
          id="first-name"
          label="Имя"
          defaultValue={firstName}
        />
        <TextField
          fullWidth
          margin="normal"
          id="last-name"
          label="Фамилия"
          defaultValue={lastName}
        />
        <div style={{ marginBottom: 16 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Дата рождения*" />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Autocomplete
            disablePortal
            freeSolo
            id="member"
            options={members}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Член семьи" />
            )}
          />
        </div>
        <FormControl>
          <FormLabel id="gender">Пол</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="gender-group"
            style={{ display: "inline" }}
          >
            {[
              { label: "Жен", value: "female" },
              { label: "Муж", value: "male" },
            ].map(({ label, value }) => (
              <FormControlLabel {...{ value, label }} control={<Radio />} />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogContent dividers>
        <Button variant="outlined">Сохранить</Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddPersonModal
