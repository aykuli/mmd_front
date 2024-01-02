import { useState, ReactElement } from "react"
import { Typography } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { GraphicEq } from "@mui/icons-material"

import Logout from "./Logout"
import MeasurementContext, { contextInitValue } from "../context"
import theme, { headerStyle, welcomeStyle } from "../ui/theme"
import "../assets/App.css"
import AddingAction from "./AddingModal/AddingActionModal"

const App = ({ children }: { children: ReactElement }) => {
  const [context, setContext] = useState(contextInitValue)

  return (
    <ThemeProvider theme={theme}>
      <MeasurementContext.Provider value={[context, setContext]}>
        <div className="App">
          <header
            className="App-header"
            style={context.token ? headerStyle : welcomeStyle}
          >
            <Typography variant="h2" style={{ width: "100%" }}>
              Анализы
            </Typography>
            {context.token ? (
              <>
                {context.profile?.isAdmin && <AddingAction />}
                <Logout />
              </>
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
      </MeasurementContext.Provider>
    </ThemeProvider>
  )
}

export default App
