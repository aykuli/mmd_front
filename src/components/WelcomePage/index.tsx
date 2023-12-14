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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 0,
  p: 4,
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
      const res: AxiosResponse<{ token: string }> = await axios(
        context.token
      ).get(
        `${String(
          process.env.REACT_APP_DOMAIN
        )}/api/v1/login?email=${email}&password=${password}`
      )
      const { token } = res.data
      if (token) {
        setContext({ token })
        setIsRedirect(true)
      }
    } catch (e) {
      setIsError(true)
    } finally {
      setIsSent(false)
    }
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Container maxWidth="sm" className="container">
      {isRedirect && <Navigate to="/dashboard" replace />}
      <Button onClick={() => setIsOpen(true)}>Войти</Button>
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
          <FormControl fullWidth variant="filled" sx={{ m: 1 }} error={isError}>
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              aria-describedby="outlined-weight-helper-text"
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

          <FormControl fullWidth variant="filled" sx={{ m: 1 }} error={isError}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
            {isError && (
              <FormHelperText id="error-text">or here</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
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
