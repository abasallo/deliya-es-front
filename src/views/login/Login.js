import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import update from 'immutability-helper'

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

import { doesUserExists, login } from '../../services/User'
import { isEmailValid } from '../../modules/email'

const Login = (props) => {
  const initialState = { email: props.appState.email, password: '', errors: { emailExistence: false, emailFormat: false, password: false } }
  const [state, setState] = useState(initialState)

  const checkEmailExistence = async (state) => {
    const userExistence = await doesUserExists(state.email)
    if (!state.email || !userExistence) {
      return update(state, { errors: { emailExistence: { $set: true } } })
    }
    return state
  }

  const checkEmailFormatValidity = (state) => {
    if (!state.email || !isEmailValid(state.email)) {
      return update(state, { errors: { emailFormat: { $set: true } } })
    }
    return state
  }

  const checkPasswordValidity = (token, state) => {
    if (!state.password || !token) {
      return update(state, { errors: { password: { $set: true } } })
    }
    return state
  }

  const isStateKO = (state) => state.errors.emailExistence || state.errors.emailFormat || state.errors.password

  const onSubmit = async (event) => {
    event.preventDefault()
    const token = await login(state.email, state.password)
    const newState = await checkPasswordValidity(token, await checkEmailExistence(checkEmailFormatValidity(state)))
    if (!isStateKO(newState)) props.setAppState({ email: state.email, token: token })
    setState(newState)
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
          name="email"
          label="Correo electrónico"
          autoComplete="email"
          autoFocus
          value={state.email}
          onChange={(event) =>
            setState(
              update(state, {
                email: { $set: event.target.value },
                errors: { emailFormat: { $set: false }, emailExistence: { $set: false } }
              })
            )
          }
          error={state.errors.emailExistence || state.errors.emailFormat}
          helperText={state.errors.emailExistence || state.errors.emailFormat ? 'Correo electrónico no válido, o inexistente' : ''}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          value={state.password}
          onChange={(event) => setState(update(state, { password: { $set: event.target.value }, errors: { password: { $set: false } } }))}
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
