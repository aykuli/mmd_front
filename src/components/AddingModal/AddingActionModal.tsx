import { useState } from "react"
import { AddCircle, Add } from "@mui/icons-material"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import AddPersonModal from "./AddPersonModal"
import AddMeasurementModal from "./AddMeasurementModal"

type ModalType = "person" | "entity" | "measurement"

const AddingActionModal = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<ModalType | null>(null)

  return (
    <>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <AddCircle fontSize="large" />
      </IconButton>

      {modalType === "person" && (
        <AddPersonModal
          open={open}
          setOpen={(boolValue: boolean) => {
            setOpen(boolValue)
            setModalType(null)
          }}
        />
      )}
      {modalType === "measurement" && (
        <AddMeasurementModal
          open={open}
          setOpen={(boolValue: boolean) => {
            setOpen(boolValue)
            setModalType(null)
          }}
        />
      )}

      <Dialog onClose={() => setOpen(false)} open={open && !modalType}>
        <DialogTitle>Добавить</DialogTitle>
        <DialogContent dividers>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setModalType("person")
                }}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="человека" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setModalType("measurement")
                }}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="анализ" />
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddingActionModal