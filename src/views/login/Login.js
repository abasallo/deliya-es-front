import React, { useState } from 'react'

import { withCookies } from 'react-cookie'

import { withRouter } from 'react-router'

import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import update from 'immutability-helper'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { AvatarContainer, Button, FormControlLabel } from './Login.styled.components'

import Copyright from '../../components/Copyright/Copyright'
import Snackbar from '../../components/Snackbar/Snackbar'

import { doesUserExists, login, activateUser } from '../../services/User'
import { isEmailValid } from '../../modules/email'
import { withAuthenticationContext } from '../../withAuthenticationContext'

const initialState = {
  email: '',
  password: '',
  remember: false,
  disabled: false,
  errors: { emailExistence: false, emailFormat: false, password: false },
  snackbar: { open: false, text: '' }
}

const setStateDependingOnEmailFormatValidity = (state) =>
  !state.email || !isEmailValid(state.email) ? update(state, { errors: { emailFormat: { $set: true } } }) : state

const setStateDependingOnEmailExistence = async (state) =>
  !state.email || !(await doesUserExists(state.email)) ? update(state, { errors: { emailExistence: { $set: true } } }) : state

const setStateDependingOnPasswordValidity = (token, state) =>
  !state.password || !token ? update(state, { errors: { password: { $set: true } } }) : state

const setStateDependingOnUserActivation = (props, state, setState) => {
  if (props.fromUserActivationEmail && !state.snackbar.open) {
    activateUser(props.match.params.token).then(() =>
      setState(update(state, { disabled: { $set: true }, snackbar: { open: { $set: true }, text: { $set: 'Usuario activado :-)' } } }))
    )
  }
}

const isStateValid = (state) => state.errors.emailExistence || state.errors.emailFormat || state.errors.password

const setCookiesIfRememberIsActive = (props, state, token) => {
  if (state.remember) {
    props.cookies.set('email', state.email)
    props.cookies.set('token', token)
  }
}

const Login = (props) => {
  initialState.email = props.authenticationContext.state.email
  const [state, setState] = useState(initialState)

  setStateDependingOnUserActivation(props, state, setState)

  const onSnackbarClose = () => {
    setState(initialState)
    props.history.push('/')
  }

  const onSwitchChange = (event) => setState(update(state, { remember: { $set: event.target.checked } }))

  const onPasswordChange = (event) =>
    setState(update(state, { password: { $set: event.target.value }, errors: { password: { $set: false } } }))

  const onEmailChange = (event) =>
    setState(
      update(state, { email: { $set: event.target.value }, errors: { emailFormat: { $set: false }, emailExistence: { $set: false } } })
    )

  const onSubmit = async (event) => {
    event.preventDefault()
    const token = await login(state.email, state.password)
    setCookiesIfRememberIsActive(props, state, token)
    const newState = await setStateDependingOnPasswordValidity(
      token,
      await setStateDependingOnEmailExistence(setStateDependingOnEmailFormatValidity(state))
    )
    isStateValid(newState) ? setState(newState) : props.authenticationContext.setState({ email: state.email, token: token })
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
          onChange={onEmailChange}
          error={state.errors.emailExistence || state.errors.emailFormat}
          helperText={state.errors.emailExistence || state.errors.emailFormat ? 'Correo electrónico no válido, o inexistente' : ''}
          disabled={state.disabled}
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
          onChange={onPasswordChange}
          error={state.errors.password}
          helperText={state.errors.password ? 'Contraseña incorrecta' : ''}
          disabled={state.disabled}
        />
        <FormControlLabel
          control={<Switch checked={state.remember} onChange={onSwitchChange} />}
          label="Recuérdame"
          disabled={state.disabled}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={state.disabled}>
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
      <Snackbar state={state} onClose={onSnackbarClose} />
    </Container>
  )
}

Login.propTypes = {
  cookies: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  fromUserActivationEmail: PropTypes.string,
  authenticationContext: PropTypes.object
}

export default withCookies(withRouter(withAuthenticationContext(Login)))
