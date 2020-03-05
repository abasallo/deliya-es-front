import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import './Login.style.scss'

import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright'

import { login } from '../../services/User'
import { isEmailValid } from '../../modules'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailErrorActive, setIsEmailErrorActive] = useState(false)
  const [isPasswordErrorActive, setIsPasswordErrorActive] = useState(false)

  return (
    <Container component="main" maxWidth="xs">
      <div className="Paper">
        <div className="Avatar">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Autenticación
          </Typography>
        </div>
        <form
          className="Form"
          noValidate
          onSubmit={async event => {
            event.preventDefault()
            const token = await login(email, password)
            if (password && !token) setIsPasswordErrorActive(true)
            if (email && !isEmailValid(email)) setIsEmailErrorActive(true)
            if (!isEmailErrorActive && !isPasswordErrorActive) {
              props.loginState.setEmail(email)
              props.loginState.setToken(token)
            }
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={event => {
              setEmail(event.target.value)
              setIsEmailErrorActive(false)
            }}
            error={isEmailErrorActive}
            helperText={isEmailErrorActive ? 'Correo electrónico no válido' : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={event => {
              setPassword(event.target.value)
              setIsPasswordErrorActive(false)
            }}
            error={isPasswordErrorActive}
            helperText={isPasswordErrorActive ? 'Contraseña incorrecta' : ''}
          />

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Recuérdame" className="Checkbox" />
          <div className="Button">
            <Button type="submit" fullWidth variant="contained" color="primary">
              Entrar
            </Button>
          </div>
          <Grid container>
            <Grid item xs>
              <Link to="/password-recovery">¿Olvidaste tu contraseña?</Link>
            </Grid>
            <Grid item>
              <Link to="/signup">¿Eres nuevo? ¡Date de alta!</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

Login.propTypes = {
  loginState: PropTypes.shape({
    setEmail: PropTypes.func,
    token: PropTypes.string,
    setToken: PropTypes.func
  })
}

export default Login
