import { Dispatch, SetStateAction } from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../ui/Accordions"
import { Typography } from "@mui/material"
import { IMeasurementInList } from "../../types"
import Measurements from "./Measurements"

interface GroupProps {
  code: string
  title: string
  index: number
  expanded: number | null
  setExpanded: Dispatch<SetStateAction<number | null>>
  measurements: IMeasurementInList[]
}

const Group = ({
  code,
  title,
  index,
  expanded,
  setExpanded,
  measurements,
}: GroupProps) => {
  return (
    <Accordion
      key={code}
      expanded={expanded === index}
      onChange={() => setExpanded(expanded === index ? null : index)}
    >
      <AccordionSummary aria-controls={title} id={code}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Measurements {...{ measurements }} />
      </AccordionDetails>
    </Accordion>
  )
}

export default Group
