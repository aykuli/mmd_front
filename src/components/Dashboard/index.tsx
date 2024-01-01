import { useEffect, useState, useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import { AxiosResponse } from "axios"
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Snackbar,
  Typography,
} from "@mui/material"

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../ui/Accordions"
import LastMeasurements, { LastDate } from "./LastMeasurements"
import PayAttention, { Warning } from "./PayAttention"
import axios from "../../services/api"
import MeasurementContext from "../../context"
import { IUser } from "../../types"

interface FamilyResponse {
  users: IUser[]
}

type LastMeasurementsType = { [id: number]: LastDate[] }
type WarningMeasurementsType = { [id: number]: Warning[] }

const Dashboard = () => {
  const [context, setContext] = useContext(MeasurementContext)

  const [lastMeasurements, setLastMeasurements] =
    useState<LastMeasurementsType | null>(null)
  const [warningMeasurements, setWarningMeasurements] =
    useState<WarningMeasurementsType | null>(null)
  const [isMeasuresLoading, setIsMeasuresLoading] = useState<boolean>(false)
  const [family, setFamily] = useState<IUser[]>([])
  const [isFamilyLoading, setIsFamilyLoading] = useState<boolean>(false)
  const [isOpenAllMeasurements, setIsOpen] = useState<boolean>(false)

  const saveParent = (users: IUser[]) => {
    const parent = users.find((user) => user.parent_id != null)
    if (parent) {
      setContext({ ...context, parent_id: parent.id })
    }
  }

  const fetchFamily = async () => {
    setIsFamilyLoading(true)
    try {
      const familyData: AxiosResponse<FamilyResponse> = await axios(
        context.token
      ).post(`${String(process.env.REACT_APP_DOMAIN)}/api/v1/family`)
      const users = familyData.data.users
      setFamily(users)
      saveParent(users)

      setContext({ ...context, users })
      users.forEach(({ id }) => {
        fetchLastMeasurements(id)
        fetchWarningMeasurements(id)
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsFamilyLoading(false)
    }
  }

  const fetchLastMeasurements = async (user_id: number) => {
    setIsMeasuresLoading(true)
    try {
      const res: AxiosResponse<LastDate[]> = await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/dates`,
        { user_id, limit: 5 }
      )

      setLastMeasurements((prev) => {
        const prevState = prev || {}
        return { ...prevState, [user_id]: res.data }
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsMeasuresLoading(false)
    }
  }

  const fetchWarningMeasurements = async (user_id: number) => {
    setIsMeasuresLoading(true)
    try {
      const res: AxiosResponse<Warning[]> = await axios(context.token).post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/measurements/warnings`,
        { user_id }
      )
      setWarningMeasurements((prev: WarningMeasurementsType | null) => {
        const prevState = prev || {}
        return { ...prevState, [user_id]: res.data }
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsMeasuresLoading(false)
    }
  }

  useEffect(() => {
    fetchFamily()
  }, [])

  return (
    <div>
      {context.alert_message && (
        <Snackbar
          open={!!context.alert_message}
          autoHideDuration={4000}
          onClose={() =>
            setContext({ ...context, alert_type: "", alert_message: "" })
          }
        >
          <Alert severity={context.alert_type}>{context.alert_message}</Alert>
        </Snackbar>
      )}
      {!context.token && <Navigate to="/" replace />}
      {isFamilyLoading && "Request is ongoing..."}
      {family.map(({ id, first_name, member }, index) => {
        return (
          <Accordion
            key={id}
            expanded={context.expandedUserId === id}
            onChange={() => {
              setContext({
                ...context,
                expandedUserId: id === context.expandedUserId ? null : id,
                user_id: id,
              })
            }}
          >
            <AccordionSummary aria-controls={first_name} id={String(id)}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">{`${
                  member ? `${member} ` : ""
                } ${first_name}`}</Typography>

                <Typography
                  variant="body1"
                  onClick={() => {
                    setContext({
                      ...context,
                      entity_code: null,
                      entity_title: null,
                      entity_unit: null,
                      measured_at: null,
                      user_id: id,
                    })
                    setIsOpen(true)
                  }}
                >
                  Все измерения
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p>{isMeasuresLoading ? "Loading data" : ""} </p>

              {lastMeasurements && lastMeasurements[id] ? (
                <LastMeasurements data={lastMeasurements[id]} />
              ) : null}

              {warningMeasurements && warningMeasurements[id] ? (
                <PayAttention data={warningMeasurements[id]} />
              ) : null}
            </AccordionDetails>
          </Accordion>
        )
      })}

      <Dialog open={isOpenAllMeasurements} onClose={() => setIsOpen(false)}>
        <DialogTitle>Сгруппировать по:</DialogTitle>
        <DialogContent dividers>
          <List>
            <ListItem style={{ padding: "20px 10px" }}>
              <Link to="/measurements/all">датам</Link>
            </ListItem>
            <ListItem style={{ padding: "20px 10px" }}>
              <Link to="/entities/all">анализам</Link>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Dashboard
