import { useEffect, useState, useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import { AxiosResponse } from "axios"
import { Typography } from "@mui/material"

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../ui/Accordions"
import LastMeasurements, { LastDate } from "./LastMeasurements"
import PayAttention, { Warning } from "./PayAttention"
import axios from "../../services/api"
import MeasurementContext from "../../context"
import { FamilyMember } from "../../types"

interface FamilyResponse {
  users: FamilyMember[]
}

type LastMeasurementsType = { [id: number]: LastDate[] }
type WarningMeasurementsType = { [id: number]: Warning[] }

const Dashboard = () => {
  const [context, setContext] = useContext(MeasurementContext)

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
      const familyData: AxiosResponse<FamilyResponse> = await axios(
        context.token
      ).post(`${String(process.env.REACT_APP_DOMAIN)}/api/v1/family`)
      const users = familyData.data.users
      setFamily(users)

      users.forEach(({ id }) => {
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
      const res: AxiosResponse<LastDate[]> = await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/dates`,
        { user_id, limit: 5 }
      )

      setLastMeasurements((prev) => {
        const prevState = prev || {}
        return { ...prevState, [user_id]: res.data }
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
      const res: AxiosResponse<Warning[]> = await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/warnings`,
        { user_id }
      )
      setWarningMeasurements((prev: WarningMeasurementsType | null) => {
        const prevState = prev || {}
        return { ...prevState, [user_id]: res.data }
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
      {!context.token && <Navigate to="/" replace />}
      {isFamilyLoading && "Request is ongoing..."}
      {family.map(({ id, first_name, member }, index) => {
        return (
          <Accordion
            key={id}
            expanded={expanded === index}
            onChange={() => setExpanded(expanded === index ? null : index)}
          >
            <AccordionSummary aria-controls={first_name} id={String(id)}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">{`${
                  member ? `${member} ` : ""
                } ${first_name}`}</Typography>

                <Link
                  to="/measurements"
                  onClick={() => {
                    setContext({
                      ...context,
                      entity_code: null,
                      entity_title: null,
                      entity_unit: null,
                      measured_at: null,
                      user_id: id,
                    })
                  }}
                >
                  Все измерения
                </Link>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p>{isMeasuresLoading ? "Loading data" : ""} </p>

              {lastMeasurements && lastMeasurements[id] ? (
                <LastMeasurements data={lastMeasurements[id]} />
              ) : null}

              {warningMeasurements && warningMeasurements[id] ? (
                <PayAttention data={warningMeasurements[id]} />
              ) : null}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

export default Dashboard
