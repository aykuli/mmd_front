import { Button, Container, Typography } from "@mui/material"

import "./assets/App.css"
import { useState } from "react"
import Dashboard from "./components/Dashboard"
import Chart from "./components/Chart"

function App() {
  const [page, setPage] = useState<string>("/")
  const [entity, setEntity] = useState<string | null>(null)

  return (
    <div className="App">
      <header className="App-header">
        <Typography align="left" variant="h2" className="title">
          Monitor your blood state
        </Typography>
      </header>
      <Container maxWidth="sm" className="container">
        <Button variant="outlined" onClick={() => setPage("dashboard")}>
          Показать варианты
        </Button>

        {page === "dashboard" && (
          <Dashboard
            onEntityClick={(value: string) => {
              setEntity(value)
              setPage("chart")
            }}
          />
        )}

        {page === "chart" && <Chart entity={entity} />}
      </Container>
    </div>
  )
}

export default App
