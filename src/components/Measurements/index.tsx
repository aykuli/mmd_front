import { useContext, useEffect, useState } from "react"
import { AxiosResponse } from "axios"

import axios from "../../services/api"
import MeasurementContext from "../../context"
import { IMeasurement } from "../../types"

const Measurements = () => {
  const [context, setContext] = useContext(MeasurementContext)

  const [Measurements, setMeasurements] = useState<IMeasurement[]>([])
  const [isMeasuresLoading, setIsMeasuresLoading] = useState<boolean>(false)

  const fetchLastMeasurements = async (user_id: number) => {
    setIsMeasuresLoading(true)
    try {
      const res: AxiosResponse<IMeasurement[]> = await axios(
        context.token
      ).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/dates`,
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
    fetchLastMeasurements(context.user_id)
  }, [])

  return <>hello</>
}

export default Measurements
