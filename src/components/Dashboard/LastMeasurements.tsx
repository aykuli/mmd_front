import { useContext } from "react"
import { Link } from "react-router-dom"
import { List, ListItem, Typography } from "@mui/material"

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
  const message = data.length
    ? "Последние измерения:"
    : "Добавьте ваши измерения (выше в шапке)"

  return (
    <>
      <Typography align="left">{message}</Typography>
      <List dense>
        {data
          ? data.map(({ id, user_id, measured_at }) => {
              return (
                <ListItem
                  key={id}
                  onClick={() => {
                    setContext({
                      ...context,
                      entity: null,
                      measured_at: measured_at,
                      user_id,
                    })
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
