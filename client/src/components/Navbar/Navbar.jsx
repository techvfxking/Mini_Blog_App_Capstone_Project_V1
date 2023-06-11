import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useStyles from './Style'
import { useDispatch } from 'react-redux'
import miniBlogHeaderLogo from '../../assets/icons/mini_blog_header_icon.svg'
import { LOGOUT } from '../../constants/actionTypes'
import jwtDecode from 'jwt-decode'

const Navbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const logout = () => {
    dispatch({ type: LOGOUT })
    navigate(0)
    setUser(null)
  }
  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = jwtDecode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          variant="h2"
          align="center"
          onClick={() => {
            navigate('/')
          }}
        >
          Mini Blog
        </Typography>
        <img
          className={classes.image}
          src={miniBlogHeaderLogo}
          alt="Mini Blog Logo"
          height="45"
          onClick={() => {
            navigate('/')
          }}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
