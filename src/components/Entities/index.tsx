import { useContext, useEffect, useState } from "react"
import { AxiosResponse } from "axios"

import { IEntityGroup, IGroupedMeasurement } from "../../types"
import axios from "../../services/api"
import MeasurementContext from "../../context"
import Group from "../MeasurementsByDate/Group"

const unlisted: IEntityGroup = {
  id: 0,
  code: "unlisted",
  title: "Без группы",
}

const Entities = () => {
  const [context] = useContext(MeasurementContext)

  const [groups, setGroups] = useState<IEntityGroup[]>([])
  const [measurements, setMeasurements] = useState<IGroupedMeasurement | null>(
    null
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<number | null>(0)

  const fetchGroups = async () => {
    setIsLoading(true)
    try {
      const response: [
        AxiosResponse<{ entities: IEntityGroup[] }>,
        AxiosResponse<IGroupedMeasurement>
      ] = await Promise.all([
        axios(context.token).post(
          `${String(process.env.REACT_APP_DOMAIN)}/api/v1/entities/groups`
        ),
        axios(context.token).post(
          `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/all`,
          { user_id: context.user_id, grouped_by: "entity" }
        ),
      ])
      setGroups([...response[0].data.entities, unlisted])
      setMeasurements(response[1].data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <div>
      {isLoading && "Запрос в процессе..."}
      {groups.map(({ code, title }, index) => {
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
              setRefresh: () => {},
              justTitles: true,
            }}
          />
        )
      })}
    </div>
  )
}

export default Entities
