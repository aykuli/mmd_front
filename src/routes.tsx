import { createBrowserRouter } from "react-router-dom"

import "./assets/index.css"
import Dashboard from "./components/Dashboard"
import Chart from "./components/Chart"
import MeasurementsByDate from "./components/MeasurementsByDate"
import WelcomePage from "./components/WelcomePage"

const routes = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <WelcomePage />,
    errorElement: <WelcomePage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <WelcomePage />,
  },
  {
    path: "measured_at/:date",
    element: <MeasurementsByDate />,
    errorElement: <WelcomePage />,
  },
  {
    path: "measurements/:code",
    element: <Chart />,
    errorElement: <WelcomePage />,
  },
])

export default routes
