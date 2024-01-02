import { createContext } from "react"
import { IUser } from "../types"
export interface IMeasurementContext {
  entity_code: string | null
  entity_unit: string | null
  entity_title: string | null
  measured_at: Date | null
  user_id: number | null
  token: string | null
  profile: IUser | null
  users: IUser[] | null
  alert_message: string
  alert_type: string
  expandedUserId: number | null
  refresh: boolean
}
const contextInitValue: IMeasurementContext = {
  entity_code: null,
  entity_unit: null,
  entity_title: null,
  measured_at: null,
  user_id: null,
  token: null,
  profile: null,
  users: null,
  alert_message: "",
  alert_type: "",
  expandedUserId: null,
  refresh: false,
}
const setContext: any = (context: IMeasurementContext) => {
  return context
}
const MeasurementContext = createContext([contextInitValue, setContext])

export default MeasurementContext

export { contextInitValue }
