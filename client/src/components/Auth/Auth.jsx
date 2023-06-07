import React, { useState, useEffect } from 'react'
import {
    Avatar, Button, Paper,
    Grid, Typography, Container, Box
} from '@material-ui/core';
import Icon from './Icon';
//import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import useStyles from './Styles'
import Input from './Input';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
   
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isSignup, setIsSignUp] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    const switchMode = () => {
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }
    const googleSuccess = (credentialResponse) => {
        const credentials = credentialResponse.credential;
        const response = jwtDecode(credentials);
        try {
            dispatch({ type: 'AUTH', data: { response, credentials } });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
        
    }

    const googleFailure = (error) => {
        console.log("Error")
        console.log(error)
    }


    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {
                        isSignup ? 'Sign Up' : 'Sign In'
                    }
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} half={true} />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half={true} />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignup && (<Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />)
                        }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {
                            isSignup ? 'Sign Up' : 'Sign In'
                        }
                    </Button>
                    <section className="googleButton">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                googleSuccess(credentialResponse)
                            }}
                            onError={(error) => {
                                googleFailure(error)
                            }}
                        />
                        <br />
                    </section>
                    <br />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {
                                    isSignup ?
                                        ("Have an account? Sign In") :
                                        ("Don't have an account? Sign Up")
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth