import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Link, ListItemIcon, List, ListItem, Typography } from "@mui/material"
import { ArrowCircleRight } from "@mui/icons-material"
import { Entity, FamilyMember } from "../../types"
import { Accordion, AccordionDetails, AccordionSummary } from "./components"

interface DashboardProps {
  onEntityClick: (page: string) => void
}

interface FamilyResponse {
  users: FamilyMember[]
}

const Dashboard = ({ onEntityClick }: DashboardProps) => {
  const [eList, setEList] = useState<Entity[]>([])
  const [isRequestOngoing, setIsRequestOngoing] = useState(false)
  const [family, setfamily] = useState<FamilyMember[]>([])
  const [expanded, setExpanded] = useState<number | null>(0)

  const getEntities = async () => {
    setIsRequestOngoing(true)
    try {
      const res = await axios.post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/entities/list`
      )
      setEList(res.data.entities)

      const familyData: AxiosResponse<FamilyResponse> = await axios.get(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/family`
      )
      setfamily(familyData.data.users)
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
      {family.map(({ id, first_name, member }, index) => {
        return (
          <Accordion
            expanded={expanded === index}
            onChange={() => setExpanded(expanded === index ? null : index)}
          >
            <AccordionSummary aria-controls={first_name} id={String(id)}>
              <Typography>{`${
                member ? `${member} ` : ""
              } ${first_name}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}

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
