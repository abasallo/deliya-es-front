import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import update from 'immutability-helper'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright/Copyright'
import Snackbar from '../../components/Snackbar/Snackbar'

import { AvatarContainer, Button, FormControlLabel } from './Signup.styled.component'

import { doesUserExists, requestUserActivationOverEmail, addUser } from '../../services/User'

import { isEmailValid } from '../../modules/email'

const initialState = {
  names: '',
  surnames: '',
  email: '',
  password: '',
  passwordRepeated: '',
  contactAllowed: true,
  disabled: false,
  errors: {
    emailAlreadyUsed: false,
    names: false,
    surnames: false,
    email: false,
    password: false
  },
  snackbar: {
    open: false,
    text: ''
  }
}

const setStateDependingOnEmailAlreadyUsed = async (state) =>
  state.email && (await doesUserExists(state.email)) ? update(state, { errors: { emailAlreadyUsed: { $set: true } } }) : state

const setStateDependingOnCurrentFormContents = (state) =>
  update(state, {
    errors: {
      names: { $set: !state.names },
      surnames: { $set: !state.surnames },
      email: { $set: !state.email || !isEmailValid(state.email) },
      password: { $set: !state.password || state.password !== state.passwordRepeated }
    }
  })

const setStateForDisabledAndActivationEmailSent = (state) =>
  update(state, {
    disabled: { $set: true },
    snackbar: { open: { $set: true }, text: { $set: 'Correo de activación enviado.' } }
  })

const isStateKO = (state) =>
  state.errors.emailAlreadyUsed || state.errors.names || state.errors.surnames || state.errors.email || state.errors.password

const Signup = (props) => {
  const [state, setState] = useState(initialState)

  const onSubmit = async (event) => {
    event.preventDefault()
    const newState = setStateDependingOnCurrentFormContents(await setStateDependingOnEmailAlreadyUsed(state))
    if (!isStateKO(newState)) {
      addUser({
        names: state.names,
        surnames: state.surnames,
        email: state.email,
        password: state.password,
        contactAllowed: state.contactAllowed
      }).then((user) => requestUserActivationOverEmail(user.email))
      setState(setStateForDisabledAndActivationEmailSent(newState))
    } else {
      setState(newState)
    }
  }

  const onNamesChanged = (event) => setState(update(state, { names: { $set: event.target.value }, errors: { names: { $set: false } } }))

  const onSurnamesChanged = (event) =>
    setState(update(state, { surnames: { $set: event.target.value }, errors: { surnames: { $set: false } } }))

  const onPasswordChanged = (event) =>
    setState(update(state, { password: { $set: event.target.value }, errors: { password: { $set: false } } }))

  const onEmailChanged = (event) =>
    setState(
      update(state, {
        email: { $set: event.target.value },
        errors: { emailAlreadyUsed: { $set: false }, email: { $set: false } }
      })
    )

  const onPasswordRetypedChanged = (event) =>
    setState(update(state, { passwordRepeated: { $set: event.target.value }, errors: { passwordRepeated: { $set: false } } }))

  const onSwitchChanged = (event) => setState({ ...state, contactAllowed: event.target.checked })

  const onSnackbarClosed = () => props.history.push('/')

  return (
    <Container component="main" maxWidth="xs">
      <AvatarContainer>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Alta
        </Typography>
      </AvatarContainer>
      <form noValidate onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              variant="outlined"
              required
              fullWidth
              id="names"
              name="names"
              label="Nombre/s"
              autoFocus
              defaultValue={state.names}
              onChange={onNamesChanged}
              error={state.errors.names}
              helperText={state.errors.names ? '¿cómo te llamas?' : ''}
              disabled={state.disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="lname"
              variant="outlined"
              required
              fullWidth
              id="surnames"
              name="surnames"
              label="Apellido/s"
              defaultValue={state.surnames}
              onChange={onSurnamesChanged}
              error={state.errors.surnames}
              helperText={state.errors.surnames ? '¿cómo te apellidas? :-)' : ''}
              disabled={state.disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              name="email"
              label="Correo electrónico"
              defaultValue={state.email}
              onChange={onEmailChanged}
              error={state.errors.emailAlreadyUsed || state.errors.email}
              helperText={state.errors.emailAlreadyUsed || state.errors.email ? 'no válido, o ya existente' : ''}
              disabled={state.disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="new-password"
              variant="outlined"
              required
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              defaultValue={state.password}
              onChange={onPasswordChanged}
              error={!state.password}
              helperText={!state.password ? 'al menos un caracter' : ''}
              disabled={state.disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="new-password"
              variant="outlined"
              required
              fullWidth
              id="password-retyped"
              name="password-retyped"
              label="Contraseña (otra vez)"
              type="password"
              defaultValue={state.passwordRepeated}
              onChange={onPasswordRetypedChanged}
              error={state.errors.password}
              helperText={state.errors.password ? 'no coinciden' : ''}
              disabled={state.disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={state.contactAllowed} onChange={onSwitchChanged} />}
              label="Acepto recibir inspiración, promociones y actualizaciones; en forma de correos electrónicos."
              disabled={state.disabled}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={state.disabled}>
          Enviar alta
        </Button>
        <Grid container justify="center">
          <Grid item>
            <Link href="/" variant="body2">
              ¿Ya tienes cuenta?
            </Link>
          </Grid>
        </Grid>
      </form>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Snackbar state={state} onClose={onSnackbarClosed} />
    </Container>
  )
}

Signup.propTypes = { history: PropTypes.object }

export default withRouter(Signup)
