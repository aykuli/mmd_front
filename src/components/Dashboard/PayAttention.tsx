import { List, ListItem, Typography } from "@mui/material"
import { pink } from "@mui/material/colors"
import { Upload, Download } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { WarningEnum } from "../../types"
import { useContext } from "react"
import MeassurementContext from "../../context"
export interface Warning {
  id: number
  entity_title: string
  entity_code: string
  warning: string
  measured_at: Date
  user_id: number
}

export interface PayAttentionProps {
  data: Warning[]
}

const PayAttention = ({ data }: PayAttentionProps) => {
  const [context, setContext] = useContext(MeassurementContext)

  const getTitle = (warning: string): string | undefined => {
    switch (warning) {
      case "HIGH":
        return "Выше нормы"
      case "LOW":
        return "Ниже нормы"
      default:
        return undefined
    }
  }
  return (
    <>
      {data.length ? (
        <>
          <Typography align="left">
            Обратите внимание (за последний год):
          </Typography>
          <List dense>
            {data.map(
              ({
                id,
                user_id,
                entity_title,
                entity_code,
                warning,
                measured_at,
              }) => {
                return (
                  <ListItem
                    key={id}
                    onClick={() => {
                      setContext({ ...context, user_id, entity: entity_code })
                    }}
                  >
                    <div title={getTitle(warning)}>
                      <Link
                        style={{
                          display: "flex",
                        }}
                        to={`/measurements/${entity_code}`}
                      >
                        <Typography variant="body1">
                          {`${entity_title} от ${measured_at}`}
                        </Typography>

                        {warning === WarningEnum.HIGH && (
                          <Upload sx={{ color: pink[500] }} />
                        )}
                        {warning === WarningEnum.LOW && (
                          <Download sx={{ color: pink[500] }} />
                        )}
                      </Link>
                    </div>
                  </ListItem>
                )
              }
            )}
          </List>
        </>
      ) : null}
    </>
  )
}

export default PayAttention
