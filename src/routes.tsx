import { createBrowserRouter } from "react-router-dom"

import "./assets/index.css"
import Dashboard from "./components/Dashboard"
import Chart from "./components/Chart"
import MeasurementsByDate from "./components/MeasurementsByDate"
import WelcomePage from "./components/WelcomePage"
import Measurements from "./components/Measurements"
import Entities from "./components/Entities"

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
  {
    path: "measurements/all",
    element: <Measurements />,
    errorElement: <WelcomePage />,
  },
  {
    path: "entities/all",
    element: <Entities />,
    errorElement: <WelcomePage />,
  },
])

export default routes
