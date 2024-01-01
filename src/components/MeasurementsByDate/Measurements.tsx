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

import {
  Comment,
  Upload,
  Download,
  QueryStats,
  Clear,
} from "@mui/icons-material"
import axios from "../../services/api"

interface MeasurementsProps {
  measurements: IMeasurementInList[]
  setRefresh: any
}

const Measurements = ({ measurements, setRefresh }: MeasurementsProps) => {
  const [context, setContext] = useContext(MeasurementContext)
  const [descriptionIndex, setDescriptionIndex] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const deleteMeasurement = async (id: number) => {
    try {
      setIsDeleting(true)
      await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/delete`,
        {
          id,
        }
      )
    } catch (e) {
      console.error(e)
    } finally {
      setRefresh((prev: any) => !prev)
      setIsDeleting(false)
    }
  }

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {measurements?.map(
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
          <li key={id} style={{ display: "block", marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link
                  onClick={() =>
                    setContext({
                      ...context,
                      entity: entity_code,
                      measured_at: measured_at,
                      entity_unit: unit,
                      entity_code,
                      entity_title,
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
                <Typography variant="body1" align="left">
                  {entity_title}
                </Typography>
              </div>
              <IconButton
                onClick={() => deleteMeasurement(id)}
                disabled={isDeleting}
              >
                <Clear />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
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
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                align="right"
              >{`Норма: ${max} - ${min} ${unit}`}</Typography>
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
                <DialogContentText>{`Рефересные значения: ${min} - ${max} ${unit}`}</DialogContentText>
              </DialogContent>
            </Dialog>
          </li>
        )
      )}
    </List>
  )
}

export default Measurements
