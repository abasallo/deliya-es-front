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

const onActivatingUser = (props, state, setState) => {
  if (props.fromUserActivationEmail && !state.snackbar.open) {
    activateUser(props.match.params.token).then(() => {
      setState(update(state, { disabled: { $set: true }, snackbar: { open: { $set: true }, text: { $set: 'Usuario activado :-)' } } }))
    })
  }
}

const Login = (props) => {
  initialState.email = props.authenticationContext.state.email
  const [state, setState] = useState(initialState)

  onActivatingUser(props, state, setState)

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
    if (state.remember) {
      props.cookies.set('email', state.email)
      props.cookies.set('token', token)
    }
    const newState = await checkPasswordValidity(token, await checkEmailExistence(checkEmailFormatValidity(state)))
    if (isStateKO(newState)) {
      setState(newState)
    } else {
      props.authenticationContext.setState({ email: state.email, token: token })
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
          onChange={(event) => setState(update(state, { password: { $set: event.target.value }, errors: { password: { $set: false } } }))}
          error={state.errors.password}
          helperText={state.errors.password ? 'Contraseña incorrecta' : ''}
          disabled={state.disabled}
        />
        <FormControlLabel
          control={
            <Switch checked={state.remember} onChange={(event) => setState(update(state, { remember: { $set: event.target.checked } }))} />
          }
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
      <Snackbar
        state={state}
        onClose={() => {
          setState(initialState)
          props.history.push('/')
        }}
      />
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
