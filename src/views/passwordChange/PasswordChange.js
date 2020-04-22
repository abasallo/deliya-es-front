import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import update from 'immutability-helper'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { AvatarContainer, Button } from './PasswordChange.styled.components'

import Copyright from '../../components/Copyright/Copyright'
import Snackbar from '../../components/Snackbar/Snackbar'

import { changePasswordWithToken } from '../../services/User'
import constants from '../../modules/constants'

const initialState = {
  password: '',
  passwordRepeated: '',
  disabled: false,
  errors: { password: { mismatch: false, format: false } },
  snackbar: { open: false, text: '' }
}

const setStateToPasswordMismatch = (state) => update(state, { errors: { password: { mismatch: { $set: true } } } })

const setStateToDisabledForm = (state) => update(state, { disabled: { $set: true } })

const setStateToOpenSnackbarWithText = (text, state) =>
  update(setStateToDisabledForm(state), { snackbar: { open: { $set: true }, text: { $set: text } } })

const setStateDependingOnPasswordValidity = async (props, state) =>
  state.password === state.passwordRepeated
    ? (await changePasswordWithToken(state.password, props.match.params.token))
      ? setStateToOpenSnackbarWithText(constants.PASSWORD_CHANGE_NOTIFICATION_OK, state)
      : setStateToOpenSnackbarWithText(constants.PASSWORD_CHANGE_NOTIFICATION_KO, state)
    : setStateToPasswordMismatch(state)

const PasswordChange = (props) => {
  const [state, setState] = useState(initialState)

  const onChangePassword = (event) =>
    setState(
      update(state, { password: { $set: event.target.value }, errors: { password: { format: { $set: event.target.value.length === 0 } } } })
    )

  const onChangePasswordRepeated = (event) =>
    setState(update(state, { passwordRepeated: { $set: event.target.value }, errors: { password: { mismatch: { $set: false } } } }))

  const onSnackbarClose = () => props.history.push(constants.PATH_ROOT)

  const onSubmit = async (event) => {
    event.preventDefault()
    setState(await setStateDependingOnPasswordValidity(props, state))
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <AvatarContainer>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {constants.PASSWORD_CHANGE_CAPTION}
          </Typography>
        </AvatarContainer>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Nueva contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={state.password}
            onChange={onChangePassword}
            error={state.errors.password.format}
            helperText={state.errors.password.format ? constants.PASSWORD_CHANGE_ERROR_MESSAGE_PASSWORD : ''}
            disabled={state.disabled}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password-repeated"
            label="Otra vez :-)"
            type="password"
            id="password-repeated"
            autoComplete="new-password"
            value={state.passwordRepeated}
            onChange={onChangePasswordRepeated}
            error={state.errors.password.mismatch}
            helperText={state.errors.password.mismatch ? constants.PASSWORD_CHANGE_ERROR_MESSAGE_PASSWORD_REPEATED : ''}
            disabled={state.disabled}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={state.disabled}>
            {constants.PASSWORD_CHANGE_SUBMIT_BUTTON}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar state={state} onClose={onSnackbarClose} />
    </Container>
  )
}

PasswordChange.propTypes = { match: PropTypes.object, history: PropTypes.object }

export default withRouter(PasswordChange)
