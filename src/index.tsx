import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import reportWebVitals from "./reportWebVitals"
import "./assets/index.css"
import Dashboard from "./components/Dashboard"
import Chart from "./components/Chart"
import MeasurementsByDate from "./components/MeasurementsByDate"
import WelcomePage from "./components/WelcomePage"

const router = createBrowserRouter([
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
    path: "measurement/:code",
    element: <Chart />,
    errorElement: <WelcomePage />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
