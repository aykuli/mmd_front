import { useContext } from "react"
import MeassurementContext from "../../context"

const MeasurementsByDate = () => {
  const date = useContext(MeassurementContext)

  // console.log("date", date)

  return <div>MeasurementsByDate</div>
}

export default MeasurementsByDate
