import { createContext } from "react"
export interface IMeasurementContext {
  entity: string | null
  date: Date | null
}
const context: IMeasurementContext = {entity: null, date: null}
const setContext:  any = (context: IMeasurementContext) => {}
const MeassurementContext = createContext([context,setContext])

export default MeassurementContext
