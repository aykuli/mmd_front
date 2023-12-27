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

interface IGraphSize {
  width: number
  height: number
}

const portraitSizes: IGraphSize = {
  width: 400,
  height: 600,
}

const landscapeSizes: IGraphSize = {
  width: 780,
  height: 300,
}

const Chart = () => {
  const [context] = useContext(MeasurementContext)
  const [isRequestOngoing, setIsRequestOngoing] = useState<boolean>(false)
  const [measurements, setMeasurements] = useState<IMeasurement[]>([])
  const [grSizes, setGrSizes] = useState<IGraphSize>({
    width: 400,
    height: 300,
  })
  const [minmax, setMinmax] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  })

  const fetchMEasurements = async () => {
    setIsRequestOngoing(true)
    try {
      const res: AxiosResponse<IMeasurement[]> = await axios(
        context.token
      ).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/${context.entity_code}`,
        { user_id: context.user_id }
      )
      setMeasurements(
        res.data.map((item) => {
          return { ...item, [context.entity_title]: Number(item.value) }
        })
      )
    } catch (e) {
      console.error(e)
    } finally {
      setIsRequestOngoing(false)
    }
  }

  const setOrientation = () => {
    switch (window.screen.orientation.type) {
      case "portrait-primary":
        setGrSizes(portraitSizes)
        break
      case "landscape-primary":
        setGrSizes(landscapeSizes)
        break
      default:
        setGrSizes(portraitSizes)
    }
  }

  useEffect(() => {
    fetchMEasurements()

    setOrientation()

    window.addEventListener("orientationchange", setOrientation)
  }, [])

  return (
    <>
      {!context.token && <Navigate to="/" replace />}
      <LineChart
        {...grSizes}
        data={measurements}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis dataKey="measured_at" />
        <YAxis
          domain={["dataMin-5", "dataMax+5"]}
          label={{
            value: context.entity_unit,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="max"
          stroke="#880000"
          activeDot={{ r: 4 }}
          strokeDasharray="5 5"
          format={5}       />
        <Line
          type="monotone"
          dataKey={context.entity_title}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="min"
          stroke="#885522"
          activeDot={{ r: 4 }}
          strokeDasharray="5 5"
        />
      </LineChart>
    </>
  )
}

export default Chart
