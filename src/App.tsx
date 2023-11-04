import { Button, Container, Typography } from "@mui/material"

import "./assets/App.css"
import { useState } from "react"
import Dashboard from "./components/Dashboard"

function App() {
  const [page, setPage] = useState("/")

  return (
    <div className="App">
      <header className="App-header">
        <Typography align="left" variant="h2" className="title">
          Monitor your blood state
        </Typography>
      </header>
      <Container maxWidth="sm" className="container">
        <Button
          variant="outlined"
          onClick={() => {
            console.log(page)
            setPage("dashboard")
          }}
        >
          Показать варианты
        </Button>

        {page === "dashboard" && <Dashboard />}
      </Container>
    </div>
  )
}

export default App
