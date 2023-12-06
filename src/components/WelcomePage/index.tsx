import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Box,
  Container,
  Modal,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

import axios from "../../services/api"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const WelcomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [pwdInputType, setPwdInputType] = useState<string>("password")
  const [isSent, setIsSent] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const sendCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSent(true)

    try {
      const res = axios().post(
        `${String(process.env.REACT_APP_DOMAIN)}/api/v1/login`,
        {
          email,
          password,
        }
      )
      console.log((await res).data)
    } catch (e) {
      console.log(e)
      setError(String(e))
    } finally {
      setIsSent(false)
    }
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  console.log(email)
  console.log(password)
  return (
    <Container maxWidth="sm" className="container">
      <Button onClick={() => setIsOpen(true)}>Войти</Button>
      <Link to="dashboard">Войти</Link>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
          setEmail("")
          setPassword("")
        }}
      >
        <Box
          sx={style}
          component="form"
          autoComplete="off"
          onSubmit={sendCredentials}
        >
          <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              value={email}
              onChange={(input) => setEmail(input.currentTarget.value)}
            />
          </FormControl>

          <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={pwdInputType}
              value={password}
              onChange={(input) => setPassword(input.currentTarget.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setPwdInputType(
                        pwdInputType === "password" ? "text" : "password"
                      )
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {pwdInputType === "password" ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
            <Button
              type="submit"
              variant="outlined"
              disabled={email === "" || password === ""}
            >
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Container>
  )
}

export default WelcomePage
