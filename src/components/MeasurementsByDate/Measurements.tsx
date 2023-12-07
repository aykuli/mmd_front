import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material"
import { pink } from "@mui/material/colors"

import MeasurementContext from "../../context"
import { IMeasurementInList, WarningEnum } from "../../types"

import { Comment, Image, Upload, Download } from "@mui/icons-material"

interface MeasurementsProps {
  measurements: IMeasurementInList[]
}

const valueTitle = (warning: string): string => {
  if (warning === WarningEnum.HIGH) {
    return "Выше нормы"
  }
  if (warning === WarningEnum.LOW) {
    return "Ниже нормы"
  }

  return "В пределах нормы"
}

const Measurements = ({ measurements }: MeasurementsProps) => {
  const [context, setContext] = useContext(MeasurementContext)
  const [descriptionIndex, setDescriptionIndex] = useState<number | null>(null)

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {measurements.map(
        (
          {
            id,
            user_id,
            measured_at,
            value,
            max,
            min,
            unit,
            warning,
            description,
            entity_title,
            entity_code,
          },
          index
        ) => (
          <ListItem
            secondaryAction={
              <IconButton
                aria-label="comment"
                onClick={() => {
                  if (descriptionIndex === index) {
                    setDescriptionIndex(null)
                  } else {
                    setDescriptionIndex(index)
                  }
                }}
              >
                <Comment />
              </IconButton>
            }
          >
            <ListItemAvatar
              onClick={() =>
                setContext({
                  ...context,
                  entity: entity_code,
                  measured_at: measured_at,
                  user_id,
                })
              }
            >
              <Link
                title="Посмотреть график всех измерений"
                to={`/measurements/${entity_code}`}
              >
                <Avatar>
                  <Image />
                </Avatar>
              </Link>
            </ListItemAvatar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemText primary={entity_title} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                {warning === WarningEnum.HIGH && (
                  <Upload sx={{ color: pink[500] }} />
                )}
                {warning === WarningEnum.LOW && (
                  <Download sx={{ color: pink[500] }} />
                )}
                <ListItemText
                  title={valueTitle(warning)}
                  primary={value}
                  secondary={`${max} - ${min}${unit}`}
                />
              </div>
            </div>

            <Dialog
              onClose={() => setDescriptionIndex(null)}
              open={descriptionIndex === index}
            >
              <DialogTitle>{entity_title}</DialogTitle>
              <DialogContent dividers>
                <DialogContentText>{description}</DialogContentText>
              </DialogContent>
              <DialogContent dividers>
                <DialogContentText>{`Рефересные значения: ${max} - ${min}${unit}`}</DialogContentText>
              </DialogContent>
            </Dialog>
          </ListItem>
        )
      )}
    </List>
  )
}

export default Measurements
