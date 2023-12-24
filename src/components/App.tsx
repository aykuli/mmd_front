import { useState, ReactElement } from "react"
import { Typography } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { GraphicEq } from "@mui/icons-material"

import Logout from "./Logout"
import MeassurementContext, { contextInitValue } from "../context"
import theme, { headerStyle, welcomeStyle } from "../ui/theme"
import "../assets/App.css"

const App = ({ children }: { children: ReactElement }) => {
  const [context, setContext] = useState(contextInitValue)

  return (
    <ThemeProvider theme={theme}>
      <MeassurementContext.Provider value={[context, setContext]}>
        <div className="App">
          <header
            className="App-header"
            style={context.token ? headerStyle : welcomeStyle}
          >
            <Typography variant="h2" style={{ width: "100%" }}>
              Анализы
            </Typography>
            {context.token ? (
              <Logout />
            ) : (
              <>
                <Typography variant="h4">себя и семьи</Typography>
                <div className="App-welcome-icon">
                  <GraphicEq color="primary" fontSize="large" />
                </div>
              </>
            )}
          </header>
          <div>{children}</div>
        </div>
      </MeassurementContext.Provider>
    </ThemeProvider>
  )
}

export default App
