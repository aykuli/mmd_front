import { Link } from "react-router-dom"
import { Container, Typography } from "@mui/material"

import "./assets/App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography align="left" variant="h2" className="title">
          Monitor your state
        </Typography>
      </header>
      <Container maxWidth="sm" className="container">
        <Link to="dashboard">Войти</Link>
      </Container>
    </div>
  )
}

export default App
