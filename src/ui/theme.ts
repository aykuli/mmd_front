import { createTheme } from "@mui/material/styles"

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

export const welcomeStyle = {
  paddingTop: 50,
  paddingBottom: 60,
  paddingRight: 20,
  paddingLeft: 20,
}

export const headerStyle = {
  display: "flex",
  justifyContent: "right",
}

export default theme
