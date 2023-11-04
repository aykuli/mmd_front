import { useEffect, useState } from "react"
import { Button, Container, Typography } from "@mui/material"

import ViewSelect from "./ViewSelect"
import Table from "./Table"
import Chart from "./Chart"

const Dashboard = () => {
  const [view, setView] = useState("table")

  useEffect(() => {
    // fetch entities
  }, [])

  return (
    <div>
      <p>Посмотреть:</p>
    </div>
  )
}

export default Dashboard
