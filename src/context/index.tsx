import { createContext } from "react"
export interface IMeasurementContext {
  entity: string | null
  date: Date | null
  user_id: number | null
}
const contextInitValue: IMeasurementContext = {
  entity: null,
  date: null,
  user_id: null,
}
const setContext: any = (context: IMeasurementContext) => {
  return context
}
const MeassurementContext = createContext([contextInitValue, setContext])

export default MeassurementContext

export { contextInitValue }
