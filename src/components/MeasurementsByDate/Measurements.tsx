import { IconButton, List, ListItem, ListItemText } from "@mui/material"
import { IMeasurementInList } from "../../types"

import CommentIcon from "@mui/icons-material/Comment"

interface MeasurementsProps {
  measurements: IMeasurementInList[]
}

const Measurements = ({ measurements }: MeasurementsProps) => {
  console.log(measurements)
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {measurements.map(
        ({ id, measured_at, value, warning, description, entity_title }) => (
          <ListItem
            key={id}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`Line item ${entity_title}`} />
          </ListItem>
        )
      )}
    </List>
  )
}

export default Measurements
