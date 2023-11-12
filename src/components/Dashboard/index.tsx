import { useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { Link, ListItemIcon, List, ListItem, Typography } from "@mui/material"
import { ArrowCircleRight } from "@mui/icons-material"
import { Measurement, FamilyMember } from "../../types"
import { Accordion, AccordionDetails, AccordionSummary } from "./Accordions"
import LastMeasurements from "./LastMeasurements"
import axios from "../../services/api"

interface DashboardProps {
  onEntityClick: (page: string) => void
}

interface FamilyResponse {
  users: FamilyMember[]
}

type LastMeasurementsType = { [id: number]: LastDate[] }
type WarningMeasurementsType = { [id: number]: LastDate[] }

interface LastDate {
  id: number
  measured_at: Date
}

const Dashboard = ({ onEntityClick }: DashboardProps) => {
  const [lastMeasurements, setLastMeasurements] =
    useState<LastMeasurementsType | null>(null)
  const [warningMeasurements, setWarningMeasurements] =
    useState<LastMeasurementsType | null>(null)
  const [isMeasuresLoading, setIsMeasuresLoading] = useState<boolean>(false)
  const [family, setFamily] = useState<FamilyMember[]>([])
  const [isFamilyLoading, setIsFamilyLoading] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<number | null>(0)

  const fetchFamily = async () => {
    setIsFamilyLoading(true)
    try {
      const familyData: AxiosResponse<FamilyResponse> = await axios().get(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/family`
      )
      const users = familyData.data.users
      setFamily(users)

      users.forEach(({ id, first_name }) => {
        fetchLastMeasurements(id)
        fetchWarningMeasurements(id)
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsFamilyLoading(false)
    }
  }

  const fetchLastMeasurements = async (user_id: number) => {
    setIsMeasuresLoading(true)
    try {
      const res: AxiosResponse<{ dates: LastDate[] }> = await axios().post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/dates`,
        { user_id }
      )
      setLastMeasurements((prev) => {
        const prevState = prev || {}
        return { [user_id]: res.data.dates, ...prevState }
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsMeasuresLoading(false)
    }
  }

  const fetchWarningMeasurements = async (user_id: number) => {
    setIsMeasuresLoading(true)
    try {
      const res: AxiosResponse<{ dates: LastDate[] }> = await axios().post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/warnings`,
        { user_id }
      )
      setWarnings((prev) => {
        const prevState = prev || {}
        return { [user_id]: res.data.dates, ...prevState }
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsMeasuresLoading(false)
    }
  }

  useEffect(() => {
    fetchFamily()
  }, [])

  console.log(lastMeasurements)

  return (
    <div>
      {isFamilyLoading && "Request is ongoing..."}
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
              <p>{isMeasuresLoading ? "Loading data" : ""} </p>

              {lastMeasurements && lastMeasurements[id] ? (
                <LastMeasurements data={lastMeasurements[id]} />
              ) : null}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

export default Dashboard
