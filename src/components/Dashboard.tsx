import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { styled } from "@mui/material/styles"
import {
  Link,
  ListItemIcon,
  List,
  ListItem,
  Accordion as MuiAccordion,
  AccordionProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  AccordionDetails as MuiAccordionDetails,
  Typography,
} from "@mui/material"
import { ArrowCircleRight, ArrowForwardIosSharp } from "@mui/icons-material"
import { Entity, FamilyMember } from "../types"

interface DashboardProps {
  onEntityClick: (page: string) => void
}

interface FamilyResponse {
  users: FamilyMember[]
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}))

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

const Dashboard = ({ onEntityClick }: DashboardProps) => {
  const [eList, setEList] = useState<Entity[]>([])
  const [isRequestOngoing, setIsRequestOngoing] = useState(false)
  const [family, setfamily] = useState<FamilyMember[]>([])
  const [expanded, setExpanded] = useState<number | null>(0)

  const getEntities = async () => {
    setIsRequestOngoing(true)
    try {
      const res = await axios.post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/entities/list`
      )
      setEList(res.data.entities)

      const familyData: AxiosResponse<FamilyResponse> = await axios.get(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/family`
      )
      setfamily(familyData.data.users)
    } catch (e) {
      console.error(e)
    } finally {
      setIsRequestOngoing(false)
    }
  }

  useEffect(() => {
    getEntities()
  }, [])

  return (
    <div>
      {isRequestOngoing && "Request is ongoing..."}
      {family.map(({ id, first_name, member }, index) => {
        return (
          <Accordion
            expanded={expanded === index}
            onChange={() => setExpanded(expanded === index ? null : index)}
          >
            <AccordionSummary aria-controls={first_name} id={String(id)}>
              <Typography>{`${
                member ? `${member} ` : ""
              } ${first_name}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}

      <p>Посмотреть:</p>
      <List>
        {eList.map(({ id, code, title }) => {
          return (
            <ListItem id={code}>
              <ListItemIcon>
                <ArrowCircleRight />
              </ListItemIcon>
              <Link
                href="#"
                underline="hover"
                onClick={() => onEntityClick(code)}
              >
                {title}
              </Link>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default Dashboard
