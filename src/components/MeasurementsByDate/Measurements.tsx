import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Container,
} from "@mui/material"
import { pink } from "@mui/material/colors"

import MeasurementContext from "../../context"
import { IMeasurementInList, WarningEnum } from "../../types"

import { Comment, Image, Upload, Download } from "@mui/icons-material"

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
          <Container key={id} disableGutters>
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
                    entity: entity_code,
                    measured_at: measured_at,
                    user_id,
                  })
                }
              >
                <Link
                  title="Посмотреть график"
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
                    primary={value}
                    secondary={`${max} - ${min}${unit}`}
                  />
                </div>
              </div>
            </ListItem>
            {descriptionIndex === index ? (
              <Typography align="left" variant="body2">
                {description}
              </Typography>
            ) : null}
          </Container>
        )
      )}
    </List>
  )
}

export default Measurements