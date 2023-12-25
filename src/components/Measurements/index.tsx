import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { AxiosResponse } from "axios"

import axios from "../../services/api"
import MeasurementContext from "../../context"
import { IMeasurement } from "../../types"

const Measurements = () => {
  const [context, setContext] = useContext(MeasurementContext)

  const [measurements, setMeasurements] = useState<IMeasurement[]>([])
  const [isMeasuresLoading, setIsMeasuresLoading] = useState<boolean>(false)

  const fetchMeasurements = async (user_id: number) => {
    setIsMeasuresLoading(true)
    console.log(user_id)
    try {
      const res: AxiosResponse<IMeasurement[]> = await axios(
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
      {measurements.map(({ id, measured_at }) => {
        return <div>{id}</div>
      })}
    </>
  )
}

export default Measurements
