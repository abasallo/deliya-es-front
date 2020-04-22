import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import update from 'immutability-helper'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import { AvatarContainer, Button } from './PasswordRecovery.styled.components'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright/Copyright'
import Snackbar from '../../components/Snackbar/Snackbar'

import { doesUserExists, requestPasswordRecoveryOverEmail } from '../../services/User'

import { isEmailValid } from '../../modules/email'

import constants from '../../modules/constants'

const initialState = { email: '', disabled: false, errors: { emailExistence: false }, snackbar: { open: false, text: '' } }

const setStateDependingOnEmailExistenceAndValidity = async (state) =>
  !state.email || !(await doesUserExists(state.email)) || !isEmailValid(state.email)
    ? update(state, { errors: { emailExistence: { $set: true } } })
    : state

const PasswordRecovery = (props) => {
  const [state, setState] = useState(initialState)

  const onSubmit = async (event) => {
    event.preventDefault()
    let newState = await setStateDependingOnEmailExistenceAndValidity(state)
    if (!newState.errors.emailExistence) {
      newState = update(newState, { disabled: { $set: true } })
      setState(newState)
      if (requestPasswordRecoveryOverEmail(state.email)) {
        newState = update(newState, {
          snackbar: { open: { $set: true }, text: { $set: constants.PASSWORD_RECOVERY_EMAIL_SENT_NOTIFICATION } }
        })
      }
    }
    setState(newState)
  }

  const onEmailChange = (event) =>
    setState(
      update(state, {
        email: { $set: event.target.value },
        snackbar: { open: { $set: false } },
        errors: { emailExistence: { $set: false } }
      })
    )

  const onSnackbarClose = () => props.history.push(constants.PATH_ROOT)

  return (
    <Container component="main" maxWidth="xs">
      <AvatarContainer>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {constants.PASSWORD_RECOVERY_CAPTION}
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
          onChange={onEmailChange}
          error={state.errors.emailExistence}
          helperText={state.errors.emailExistence ? constants.PASSWORD_RECOVERY_ERROR_MESSAGE_EMAIL : ''}
          disabled={state.disabled}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={state.disabled}>
          {constants.PASSWORD_RECOVERY_SUBMIT_BUTTON}
        </Button>
      </form>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar state={state} onClose={onSnackbarClose} />
    </Container>
  )
}

PasswordRecovery.propTypes = { history: PropTypes.object }

export default withRouter(PasswordRecovery)
