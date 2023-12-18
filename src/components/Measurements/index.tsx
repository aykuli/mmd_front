import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { AxiosResponse } from "axios"
import { Typography } from "@mui/material"

import MeasurementsList from "../MeasurementsByDate/Measurements"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../ui/Accordions"
import axios from "../../services/api"
import MeasurementContext from "../../context"
import { IMeasurement, IGroupedMeasurement } from "../../types"

const Measurements = () => {
  const [context, setContext] = useContext(MeasurementContext)

  const [measurements, setMeasurements] = useState<IGroupedMeasurement>({})
  const [isMeasuresLoading, setIsMeasuresLoading] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchMeasurements = async (user_id: number) => {
    setIsMeasuresLoading(true)

    try {
      const res: AxiosResponse<IGroupedMeasurement> = await axios(
        context.token
      ).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/all`,
        { user_id }
      )

      setMeasurements(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsMeasuresLoading(false)
    }
  }

  useEffect(() => {
    fetchMeasurements(context.user_id)
  }, [])

  return (
    <>
      {!context.token && <Navigate to="/" replace />}
      {Object.keys(measurements).map((key) => {
        return (
          <Accordion
            key={key}
            expanded={expanded === key}
            onChange={() => setExpanded(expanded === key ? null : key)}
          >
            <AccordionSummary aria-controls={key} id={key}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{key}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p>{isMeasuresLoading ? "Loading data" : ""} </p>

              <MeasurementsList measurements={measurements[key]} />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  )
}

export default Measurements
