import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Box,
} from '@material-ui/core'
import Icon from './Icon'
//import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import useStyles from './Styles'
import Input from './Input'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AUTH } from '../../constants/actionTypes'
import { signin, signup } from '../../actions/auth.js'

const Auth = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isSignup, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
    console.log(formData)
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value === 'email' ? e.target.value.trim() : e.target.value,
    })
  }
  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }
  const googleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential
    const result = jwtDecode(token)
    try {
      dispatch({ type: AUTH, data: { result, token } })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = () => {
    alert('Google Sign In was unsuccessful. Try again later')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half={true}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half={true}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <section className="googleButton">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                googleSuccess(credentialResponse)
              }}
              onError={(error) => {
                googleFailure(error)
              }}
            />
            <br />
          </section>
          <br />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
