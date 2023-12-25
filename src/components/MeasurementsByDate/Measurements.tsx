import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import {
  IconButton,
  List,
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

import { Comment, Upload, Download, QueryStats } from "@mui/icons-material"

interface MeasurementsProps {
  measurements: IMeasurementInList[]
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
          <li
            key={id}
            style={{
              display: "block",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link
                onClick={() =>
                  setContext({
                    ...context,
                    entity: entity_code,
                    measured_at: measured_at,
                    user_id,
                  })
                }
                title="Посмотреть график всех измерений"
                to={`/measurements/${entity_code}`}
                style={{
                  marginRight: 10,
                }}
              >
                <Avatar>
                  <QueryStats />
                </Avatar>
              </Link>
              <Typography>{entity_title}</Typography>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 30px",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", marginLeft: 50 }}>
                <Typography
                  variant="body1"
                  align="left"
                  style={{ marginRight: 10 }}
                >{`${value} ${unit}`}</Typography>

                {warning === WarningEnum.HIGH && (
                  <Upload sx={{ color: pink[500] }} />
                )}
                {warning === WarningEnum.LOW && (
                  <Download sx={{ color: pink[500] }} />
                )}
              </div>
              <Typography
                variant="body1"
                align="right"
              >{`${max} - ${min}`}</Typography>
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
          </li>
        )
      )}
    </List>
  )
}

export default Measurements
