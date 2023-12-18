import { useState, ReactElement } from "react"
import { Typography } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import "../assets/App.css"
import MeassurementContext, { contextInitValue } from "../context"
import { GraphicEq } from "@mui/icons-material"

const theme = createTheme({
  typography: {
    h2: {
      color: "#1b5481",
    },
    h4: {
      color: "#1b5481",
    },
  },
  palette: {
    primary: {
      main: "#1b5481",
    },
    text: {
      primary: "#1b5481",
    },
  },
})

const App = ({ children }: { children: ReactElement }) => {
  const [context, setContext] = useState(contextInitValue)
  return (
    <ThemeProvider theme={theme}>
      <MeassurementContext.Provider value={[context, setContext]}>
        <div className="App">
          <header className="App-header">
            <Typography align="left" variant="h2">
              Анализы
            </Typography>
            <Typography align="left" variant="h4">
              себя и семьи
            </Typography>
            <div className="App-welcome-icon">
              <GraphicEq color="primary" fontSize="large" />
            </div>
          </header>
          <div>{children}</div>
        </div>
      </MeassurementContext.Provider>
    </ThemeProvider>
  )
}

export default App
