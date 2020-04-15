import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import update from 'immutability-helper'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { AvatarContainer, Button } from './PasswordRecovery.styled.components'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright/Copyright'

import { doesUserExists, requestPasswordRecoveryUrlOverEmail } from '../../services/User'

import { isEmailValid } from '../../modules/email'

const initialState = { email: '', snackbar: { open: false, text: '' }, errors: { emailExistence: false }, disabled: false }

const PasswordRecovery = (props) => {
  const [state, setState] = useState(initialState)

  const checkEmailExistenceAndValidity = async (state) => {
    const userExistence = await doesUserExists(state.email)
    if (!state.email || !userExistence || !isEmailValid(state.email)) {
      return update(state, { errors: { emailExistence: { $set: true } } })
    }
    return state
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    let newState = await checkEmailExistenceAndValidity(state)
    if (!newState.errors.emailExistence) {
      newState = update(newState, { disabled: { $set: true } })
      setState(newState)
      if (requestPasswordRecoveryUrlOverEmail(state.email)) {
        newState = update(newState, { snackbar: { open: { $set: true }, text: { $set: 'Correo de recuperación de contraseña enviado.' } } })
      }
    }
    setState(newState)
  }

  return (
    <Container component="main" maxWidth="xs">
      <AvatarContainer>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperación de contraseña
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
          onChange={(event) =>
            setState(
              update(state, {
                email: { $set: event.target.value },
                snackbar: { open: { $set: false } },
                errors: { emailExistence: { $set: false } }
              })
            )
          }
          error={state.errors.emailExistence}
          helperText={state.errors.emailExistence ? 'Correo electrónico no válido, o inexistente' : ''}
          disabled={state.disabled ? 'disabled' : ''}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={state.disabled ? 'disabled' : ''}>
          Enviar correo de recuperación
        </Button>
      </form>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={state.snackbar.open} autoHideDuration={7000} onClose={() => props.history.push('/')}>
        <Alert onClose={() => props.history.push('/')} severity="success">
          {state.snackbar.text}
        </Alert>
      </Snackbar>
    </Container>
  )
}

PasswordRecovery.propTypes = { history: PropTypes.object }

export default withRouter(PasswordRecovery)
