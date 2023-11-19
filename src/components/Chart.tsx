import { useState, useEffect, useContext } from "react"
import axios from "axios"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Measurement } from "../types"
import context from "../context"
import MeassurementContext from "../context"

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const Chart = () => {
  const entity = useContext(MeassurementContext)

  console.log("entity", entity)

  const [isRequestOngoing, setIsRequestOngoing] = useState<boolean>(false)
  const [measurements, setMeasurements] = useState<Measurement[]>([])

  // const fetchMEasurements = async () => {
  //   setIsRequestOngoing(true)
  //   try {
  //     const res = await axios.post(
  //       `${String(process.env.REACT_APP_DOMAIN)}/api/v1/${entity}`
  //     )
  //     setMeasurements(res.data.measurements)
  //   } catch (e) {
  //     console.error(e)
  //   } finally {
  //     setIsRequestOngoing(false)
  //   }
  // }
  // useEffect(() => {
  //   fetchMEasurements()
  // }, [])

  return (
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={100}
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
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        {/* <Line type="monotone" dataKey="amt" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
