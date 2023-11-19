import { Link } from "react-router-dom"
import { Container } from "@mui/material"

const WelcomePage = () => {
  return (
    <Container maxWidth="sm" className="container">
      <Link to="dashboard">Войти</Link>
    </Container>
  )
}

export default WelcomePage
