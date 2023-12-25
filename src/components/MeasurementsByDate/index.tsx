import { useEffect, useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AxiosResponse } from "axios"
import { Typography } from "@mui/material"

import Group from "./Group"
import MeassurementContext from "../../context"
import {
  IMeasurement,
  IMeasurementInList,
  IGroupedMeasurement,
} from "../../types"
import axios from "../../services/api"

interface IGroup {
  code: string
  title: string
  precedence: number
}

const MeasurementsByDate = () => {
  const [context] = useContext(MeassurementContext)

  const [expanded, setExpanded] = useState<number | null>(0)
  const [groups, setGroups] = useState<IGroup[]>([])
  const [groupCodes, setGroupCodes] = useState<Set<string>>(new Set())
  const [measurements, setMeasurements] = useState<IGroupedMeasurement | null>(
    null
  )
  const [isMeasuresLoading, setIsMeasuresLoading] = useState<boolean>(false)

  const groupMeasurement = (
    measurements: IMeasurement[]
  ): IGroupedMeasurement => {
    const result: IGroupedMeasurement = {}

    measurements.forEach((m) => {
      const group_code = m.group_code || "unlisted"

      if (!groupCodes.has(group_code)) {
        setGroupCodes(groupCodes.add(group_code))
        setGroups((prev) => [
          ...prev,
          {
            code: group_code,
            title: m.group_title || "Вне списка",
            precedence: m.group_precedence === null ? 1000 : m.group_precedence,
          },
        ])
      }

      const localMeasurement: IMeasurementInList = {
        id: m.id,
        user_id: m.user_id,
        measured_at: m.measured_at,
        value: m.value,
        warning: m.warning,
        max: m.max,
        min: m.min,
        unit: m.unit,
        description: m.description,
        entity_title: m.entity_title,
        entity_code: m.entity_code,
      }

      if (result[group_code]) {
        result[group_code] = result[group_code].concat(localMeasurement)
      } else {
        result[group_code] = [localMeasurement]
      }
    })

    return result
  }

  const fetchMeasurements = async () => {
    setIsMeasuresLoading(true)

    try {
      const res: AxiosResponse<IMeasurement[]> = await axios(
        context.token
      ).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/list`,
        { measured_at: context.measured_at, user_id: context.user_id }
      )
      setMeasurements(groupMeasurement(res.data))
    } catch (e) {
      console.error(e)
    } finally {
      setIsMeasuresLoading(false)
    }
  }

  useEffect(() => {
    fetchMeasurements()
  }, [])

  return (
    <div>
      {!context.token && <Navigate to="/" replace />}
      {isMeasuresLoading && "Request is ongoing..."}
      <Typography variant="h4">{`Анализ от ${context.measured_at}`}</Typography>
      {groups
        ? Array.from(groups)
            .sort((prev, curr) => {
              return prev.precedence > curr.precedence ? 1 : -1
            })
            .map(({ code, title }, index) => {
              return (
                <Group
                  key={code}
                  {...{
                    code,
                    title,
                    index,
                    expanded,
                    setExpanded,
                    measurements: measurements ? measurements[code] : [],
                  }}
                />
              )
            })
        : null}
    </div>
  )
}

export default MeasurementsByDate
