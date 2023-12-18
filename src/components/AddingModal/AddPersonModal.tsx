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
          required
          id="first-name"
          label="Имя"
          defaultValue={firstName}
        />
        <TextField
          margin="normal"
          id="last-name"
          label="Фамилия"
          defaultValue={lastName}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Дата рождения" />
          </DemoContainer>
        </LocalizationProvider>

        <Autocomplete
          disablePortal
          freeSolo
          id="member"
          options={members}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Член семьи" />}
        />
        <FormControl>
          <FormLabel id="gender">Пол</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
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
