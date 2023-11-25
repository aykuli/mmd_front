import { createContext } from "react"
export interface IMeasurementContext {
  entity: string | null
  measured_at: Date | null
  user_id: number | null
}
const contextInitValue: IMeasurementContext = {
  entity: null,
  measured_at: null,
  user_id: null,
}
const setContext: any = (context: IMeasurementContext) => {
  return context
}
const MeassurementContext = createContext([contextInitValue, setContext])

export default MeassurementContext

export { contextInitValue }
