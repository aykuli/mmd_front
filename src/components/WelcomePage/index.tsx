import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AxiosResponse } from "axios"
import {
  Button,
  Box,
  Container,
  Dialog,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

import axios from "../../services/api"
import MeasurementContext from "../../context"
import { IUser } from "../../types"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 0,
}

const WelcomePage = () => {
  const [context, setContext] = useContext(MeasurementContext)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [pwdInputType, setPwdInputType] = useState<string>("password")
  const [isSent, setIsSent] = useState<boolean>(false)
  const [isRedirect, setIsRedirect] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const sendCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSent(true)

    try {
      const res: AxiosResponse<{ token: string; user: IUser }> = await axios(
        context.token
      ).get(
        `${String(
          process.env.REACT_APP_DOMAIN
        )}/api/v1/login?email=${email}&password=${password}`
      )
      const { token, user } = res.data

      if (token) {
        setContext({ ...context, token, profile: user })
        setIsRedirect(true)
      }
    } catch (e) {
      setIsError(true)
    } finally {
      setIsSent(false)
    }
  }

  return (
    <Container maxWidth="sm" className="container">
      {isRedirect && <Navigate to="/dashboard" replace />}
      <button className="App-welcome-btn" onClick={() => setIsOpen(true)}>
        Войти
      </button>
      <Dialog
        fullScreen
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
          <FormControl
            variant="filled"
            sx={{ m: 1 }}
            error={isError}
            margin="none"
            className="welcome-input"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              aria-describedby="email"
              inputProps={{
                "aria-label": "weight",
              }}
              value={email}
              onChange={(input) => {
                setIsError(false)
                setEmail(input.currentTarget.value)
              }}
            />
            {isError && (
              <FormHelperText id="error-text">Maybe wrong here</FormHelperText>
            )}
          </FormControl>

          <FormControl
            className="welcome-input"
            variant="filled"
            sx={{ m: 1 }}
            error={isError}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={pwdInputType}
              value={password}
              onChange={(input) => {
                setIsError(false)
                setPassword(input.currentTarget.value)
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setPwdInputType(
                        pwdInputType === "password" ? "text" : "password"
                      )
                    }}
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
            {isError && (
              <FormHelperText id="error-credeatials">or here</FormHelperText>
            )}
          </FormControl>

          <FormControl className="welcome-input" variant="filled" sx={{ m: 1 }}>
            <Button
              type="submit"
              variant="outlined"
              disabled={email === "" || password === "" || isError || isSent}
            >
              {isSent ? "Loading" : "Submit"}
            </Button>
          </FormControl>
        </Box>
      </Dialog>
    </Container>
  )
}

export default WelcomePage
