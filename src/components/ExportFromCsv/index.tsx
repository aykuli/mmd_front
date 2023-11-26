import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  Typography,
} from "@mui/material"
import { CloudUpload } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { useState } from "react"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const ExportFromCsv = () => {
  const [isShowExample, setIsShowExample] = useState<boolean>(false)
  return (
    <Paper elevation={0} style={{ marginTop: 40, padding: 20 }}>
      <Typography variant="h5" style={{ marginBottom: 30 }}>
        Загрузить данные из файла *.csv
      </Typography>
      <Button component="label" variant="contained" startIcon={<CloudUpload />}>
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
      <div style={{ marginTop: 40, textAlign: "left" }}>
        <Button size="small" onClick={() => setIsShowExample(true)}>
          Посмотреть образец
        </Button>

        <Dialog onClose={() => setIsShowExample(false)} open={isShowExample}>
          <DialogTitle>example.csv</DialogTitle>
          <DialogContent>
            <Table>hello</Table>
          </DialogContent>
        </Dialog>
      </div>
    </Paper>
  )
}

export default ExportFromCsv
