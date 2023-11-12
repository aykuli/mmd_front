import { Link, List, ListItem, Typography } from "@mui/material"

interface LastDate {
  id: number
  measured_at: Date
}

const PayAttention = ({ data }: { data: LastDate[] }) => {
  return (
    <>
      <Typography align="left">Последние измерения:</Typography>
      <List dense>
        {data
          ? data.map(({ id, measured_at }) => {
              return (
                <ListItem key={id}>
                  <Link href="#" underline="hover">
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

export default PayAttention
