import { useState, useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AxiosResponse } from "axios"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

import { IMeasurement } from "../../types"
import MeasurementContext from "../../context"
import axios from "../../services/api"

const Chart = () => {
  const [context] = useContext(MeasurementContext)
  const [isRequestOngoing, setIsRequestOngoing] = useState<boolean>(false)
  const [measurements, setMeasurements] = useState<IMeasurement[]>([])

  const fetchMEasurements = async () => {
    setIsRequestOngoing(true)
    try {
      const res: AxiosResponse<IMeasurement[]> = await axios(
        context.token
      ).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/${context.entity}`,
        { user_id: context.user_id }
      )
      setMeasurements(
        res.data.map((item) => {
          return { ...item, value: Number(item.value) }
        })
      )
    } catch (e) {
      console.error(e)
    } finally {
      setIsRequestOngoing(false)
    }
  }
  useEffect(() => {
    fetchMEasurements()
  }, [])

  return (
    <>
      {!context.token && <Navigate to="/" replace />}
      <LineChart
        width={500}
        height={300}
        data={measurements}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="measured_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </>
  )
}

export default Chart
