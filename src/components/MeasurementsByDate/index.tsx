import { useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { useContext } from "react"
import MeassurementContext from "../../context"
import { Measurement } from "../../types"
import axios from "../../services/api"

interface Group {
  code: string
  title: string
}

interface LocalMeasurement {
  id: number
  measured_at: Date
  value: number
  warning: string
  max: number
  min: number
  unit: string
  description: string
  entity_title: string
  entity_code: string
}

interface GroupedMeasurement {
  [key: string]: LocalMeasurement[]
}

const MeasurementsByDate = () => {
  const [context, setContext] = useContext(MeassurementContext)

  const [groups, setGroups] = useState<Set<Group>>(new Set())
  const [measurements, setMeasurements] = useState<GroupedMeasurement | null>(
    null
  )
  const [isMeasuresLoading, setIsMeasuresLoading] = useState<boolean>(false)

  const groupMeasurement = (
    measurements: Measurement[]
  ): GroupedMeasurement => {
    const result: GroupedMeasurement = {}

    measurements.forEach((measurement) => {
      setGroups(
        groups.add({
          code: measurement.group_code,
          title: measurement.group_title,
        })
      )
      const localMeasurement: LocalMeasurement = {
        id: measurement.id,
        measured_at: measurement.measured_at,
        value: measurement.value,
        warning: measurement.warning,
        max: measurement.max,
        min: measurement.min,
        unit: measurement.unit,
        description: measurement.description,
        entity_title: measurement.entity_title,
        entity_code: measurement.entity_code,
      }
      if (result[measurement.group_code]) {
        result[measurement.group_code] =
          result[measurement.group_code].concat(localMeasurement)
      } else {
        result[measurement.group_code] = [localMeasurement]
      }
    })

    return result
  }

  const fetchMeasurements = async () => {
    setIsMeasuresLoading(true)
    try {
      const res: AxiosResponse<Measurement[]> = await axios().post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/list`,
        { measured_at: context.date, user_id: context.user_id }
      )
      const data = groupMeasurement(res.data)
      console.log("date: ", data)
      setMeasurements(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsMeasuresLoading(false)
    }
  }

  useEffect(() => {
    fetchMeasurements()
  }, [])

  console.log(measurements)

  return (
    <div>
      {isMeasuresLoading && "Request is ongoing..."}
      {/* {measurements.map(measurement => {
  return <Measurement 
})}     */}
      hello
    </div>
  )
}

export default MeasurementsByDate
