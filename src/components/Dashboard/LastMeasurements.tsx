import { Link, List, ListItem, Typography } from "@mui/material"

export interface LastDate {
  id: number
  measured_at: Date
}

interface LastMeasurementsProps {
  data: LastDate[]
  onClick: (date: Date) => void
}

const LastMeasurements = ({ data, onClick }: LastMeasurementsProps) => {
  return (
    <>
      <Typography align="left">Последние измерения:</Typography>
      <List dense>
        {data
          ? data.map(({ id, measured_at }) => {
              return (
                <ListItem key={id} onClick={() => onClick(measured_at)}>
                  <Link href={`/measured_at/${measured_at}`} underline="hover">
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
