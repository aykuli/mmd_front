import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import React from "react"

interface AddMeasurementProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const AddMeasurementModal = ({ open, setOpen }: AddMeasurementProps) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Добавление анализа</DialogTitle>
      <DialogContent dividers>888888</DialogContent>
    </Dialog>
  )
}

export default AddMeasurementModal
