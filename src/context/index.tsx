import { createContext } from "react"
export interface IMeasureemtnContext {
  entity: string
  date: Date
}

const meassurementContext = createContext<IMeasureemtnContext | null>(null)

const context = {
  meassurementContext,
}
export default context
