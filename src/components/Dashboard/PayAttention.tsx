import { Link, List, ListItem, Typography } from "@mui/material"

export interface Warning {
  id: number
  entity_title: string
  entity_code: string
  warning: string
}

export interface PayAttentionProps {
  data: Warning[]
  onClick: (entity: string) => void
}

const PayAttention = ({ data, onClick }: PayAttentionProps) => {
  return (
    <>
      <Typography align="left">Обратите внимание:</Typography>
      <List dense>
        {data
          ? data.map(({ id, entity_title, entity_code, warning }) => {
              return (
                <ListItem key={id} onClick={() => onClick(entity_code)}>
                  <Link href={`/measurement/${entity_code}`} underline="hover">
                    <Typography>{entity_title}</Typography>
                    <Typography>{warning}</Typography>
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
