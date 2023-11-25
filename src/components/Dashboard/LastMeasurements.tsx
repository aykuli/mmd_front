import { List, ListItem, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useContext } from "react"
import MeasurementContext from "../../context"

export interface LastDate {
  id: number
  measured_at: Date
  user_id: number
}

interface LastMeasurementsProps {
  data: LastDate[]
}

const LastMeasurements = ({ data }: LastMeasurementsProps) => {
  const [context, setContext] = useContext(MeasurementContext)

  return (
    <>
      <Typography align="left">Последние измерения:</Typography>
      <List dense>
        {data
          ? data.map(({ id, user_id, measured_at }) => {
              return (
                <ListItem
                  key={id}
                  onClick={() => {
                    setContext({ ...context, date: measured_at, user_id })
                  }}
                >
                  <Link to={`/measured_at/${measured_at}`}>
                    {String(measured_at)}
                  </Link>
                </ListItem>
              )
            })
          : null}
      </List>
    </>
  )
}

export default LastMeasurements
