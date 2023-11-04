import { useEffect, useState } from "react"
import axios from "axios"
import { Link, ListItemIcon, List, ListItem } from "@mui/material"
import { ArrowCircleRight } from "@mui/icons-material"
import { Entity } from "../types"

interface DashboardProps {
  onEntityClick: (page: string) => void
}

const Dashboard = ({ onEntityClick }: DashboardProps) => {
  const [eList, setEList] = useState<Entity[]>([])
  const [isRequestOngoing, setIsRequestOngoing] = useState(false)

  const getEntities = async () => {
    setIsRequestOngoing(true)
    try {
      const res = await axios.post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/entities/list`
      )
      setEList(res.data.entities)
    } catch (e) {
      console.error(e)
    } finally {
      setIsRequestOngoing(false)
    }
  }

  useEffect(() => {
    getEntities()
  }, [])

  return (
    <div>
      {isRequestOngoing && "Request is ongoing..."}
      <p>Посмотреть:</p>
      <List>
        {eList.map(({ id, code, title }) => {
          return (
            <ListItem id={code}>
              <ListItemIcon>
                <ArrowCircleRight />
              </ListItemIcon>
              <Link
                href="#"
                underline="hover"
                onClick={() => onEntityClick(code)}
              >
                {title}
              </Link>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default Dashboard
