import { useState, ReactElement } from "react";
import { Typography } from "@mui/material"

import "./assets/App.css"
import MeassurementContext, { IMeasurementContext } from "./context"

const App = ({ children }: { children: ReactElement }) => {
    const [context, setContext] = useState({entity: null, date: null});
  return (
      <MeassurementContext.Provider value={[context, setContext]}>
        <div className="App">
          <header className="App-header">
            <Typography align="left" variant="h2" className="title">
              Monitor your state
            </Typography>
          </header>
          <div>{children}</div>
        </div>
      </MeassurementContext.Provider>
  )
}

export default App
