import { useState, ReactElement } from "react"
import { Typography } from "@mui/material"

import "../assets/App.css"
import MeassurementContext, { contextInitValue } from "../context"
import { GraphicEq } from "@mui/icons-material"

const App = ({ children }: { children: ReactElement }) => {
  const [context, setContext] = useState(contextInitValue)
  return (
    <MeassurementContext.Provider value={[context, setContext]}>
      <div className="App">
        <header className="App-header">
          <Typography align="left" variant="h2" className="title">
            <GraphicEq /> Monitor your state
          </Typography>
        </header>
        <div>{children}</div>
      </div>
    </MeassurementContext.Provider>
  )
}

export default App
