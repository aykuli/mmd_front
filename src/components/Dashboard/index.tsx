import { useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { Typography } from "@mui/material"

import { FamilyMember } from "../../types"
import { Accordion, AccordionDetails, AccordionSummary } from "./Accordions"
import LastMeasurements, { LastDate } from "./LastMeasurements"
import axios from "../../services/api"
import PayAttention, { Warning } from "./PayAttention"

interface FamilyResponse {
  users: FamilyMember[]
}

interface ContextProps {
  entity: string | null
  date: Date | null
}

type LastMeasurementsType = { [id: number]: LastDate[] }
type WarningMeasurementsType = { [id: number]: Warning[] }

const Dashboard = () => {
  const [lastMeasurements, setLastMeasurements] =
    useState<LastMeasurementsType | null>(null)
  const [warningMeasurements, setWarningMeasurements] =
    useState<WarningMeasurementsType | null>(null)
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
      const res: AxiosResponse<{ warnings: Warning[] }> = await axios().post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/warnings`,
        { user_id }
      )
      setWarningMeasurements((prev: WarningMeasurementsType | null) => {
        const prevState = prev || {}
        return { [user_id]: res.data.warnings, ...prevState }
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

  return (
      <div>
        {isFamilyLoading && "Request is ongoing..."}
        {family.map(({ id, first_name, member }, index) => {
          return (
            <Accordion
              key={id}
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
                  <LastMeasurements
                    data={lastMeasurements[id]}
                  />
                ) : null}

                {warningMeasurements && warningMeasurements[id] ? (
                  <PayAttention                    data={warningMeasurements[id]}                  />
                ) : null}
              </AccordionDetails>
            </Accordion>
          )
        })}
      </div>
  )
}

export default Dashboard
