import { useContext } from "react"
import LogoutIcon from "@mui/icons-material/Logout"
import { IconButton } from "@mui/material"

import axios from "../../services/api"
import MeasurementContext from "../../context"

const Logout = () => {
  const [context, setContext] = useContext(MeasurementContext)

  const logout = async () => {
    try {
      setContext({ ...context, token: null })

      await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/logout`
      )
    } catch (e) {
    } finally {
    }
  }

  return (
    <IconButton color="primary" onClick={logout}>
      <LogoutIcon fontSize="large" />
    </IconButton>
  )
}

export default Logout
