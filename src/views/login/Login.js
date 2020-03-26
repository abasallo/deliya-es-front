import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'

import { AvatarContainer, Button, FormControlLabel } from './Login.styled.components'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright/Copyright'

import { login } from '../../services/graphql/User'
import { isEmailValid } from '../../modules/email'

const Login = (props) => {
  const [state, setState] = useState({ email: props.appState.email, password: '', errors: { email: false, password: false } })

  const onSubmit = async (event) => {
    event.preventDefault()
    const token = await login(state.email, state.password)
    if (state.password && !token) setState({ ...state, errors: { ...state.errors, password: true } })
    if (state.email && !isEmailValid(state.email)) setState({ ...state, errors: { ...state.errors, email: true } })
    if (!state.errors.email && !state.errors.password) {
      props.setAppState({ email: state.email, token: token })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <AvatarContainer>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Autenticación
        </Typography>
      </AvatarContainer>
      <form noValidate onSubmit={onSubmit}>
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
          value={state.email}
          onChange={(event) => setState({ ...state, email: event.target.value, errors: { ...state.errors, email: false } })}
          error={state.errors.email}
          helperText={state.errors.email ? 'Correo electrónico no válido' : ''}
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
          value={state.password}
          onChange={(event) => setState({ ...state, password: event.target.value, errors: { ...state.errors, password: false } })}
          error={state.errors.password}
          helperText={state.errors.password ? 'Contraseña incorrecta' : ''}
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Recuérdame" />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Entrar
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/password-recovery">¿Olvidaste tu contraseña?</Link>
          </Grid>
          <Grid item>
            <Link to="/signup">¿Eres nuevo? ¡Date de alta!</Link>
          </Grid>
        </Grid>
      </form>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

Login.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func
}

export default Login
