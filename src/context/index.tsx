import { createContext } from "react"
export interface IMeasurementContext {
  entity: string | null
  date: Date | null
}

const MeassurementContext = createContext<IMeasurementContext | null>(null)

export default MeassurementContext
