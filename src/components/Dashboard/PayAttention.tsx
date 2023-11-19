import { Link, List, ListItem, Typography } from "@mui/material"

export interface Warning {
  id: number
  entity_title: String
  warning: String
}

const PayAttention = ({ data }: { data: Warning[] }) => {
  return (
    <>
      <Typography align="left">Обратите внимание:</Typography>
      <List dense>
        {data
          ? data.map(({ id, entity_title, warning }) => {
              return (
                <ListItem key={id}>
                  <Link href="#" underline="hover">
                    {String(entity_title)}
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
