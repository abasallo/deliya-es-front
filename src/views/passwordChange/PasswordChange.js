import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import update from 'immutability-helper'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import { AvatarContainer, Button } from './PasswordChange.styled.components'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright/Copyright'
import Snackbar from '../../components/Snackbar/Snackbar'

import { changePasswordWithToken } from '../../services/User'

const initialState = {
  password: '',
  passwordRepeated: '',
  disabled: false,
  errors: { password: { missmatch: false, format: false } },
  snackbar: { open: false, text: '' }
}

const PasswordChange = (props) => {
  const [state, setState] = useState(initialState)

  const disableForm = () => update(state, { disabled: { $set: true } })

  const checkPasswordValidity = async (state) => {
    if (state.password === state.passwordRepeated) {
      if (await changePasswordWithToken(state.password, props.match.params.token)) {
        return update(disableForm(state), {
          snackbar: { open: { $set: true }, text: { $set: 'La contraseña ha sido cambiada con éxito.' } }
        })
      } else {
        return update(disableForm(state), {
          snackbar: { open: { $set: true }, text: { $set: 'Error, los enlaces caducan rápidamente, vuelva a intentarlo de nuevo.' } }
        })
      }
    }
    return update(state, { errors: { password: { missmatch: { $set: true } } } })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setState(await checkPasswordValidity(state))
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <AvatarContainer>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cambio de contraseña
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
            onChange={(event) =>
              setState(
                update(state, {
                  password: { $set: event.target.value },
                  errors: { password: { format: { $set: event.target.value.length === 0 } } }
                })
              )
            }
            error={state.errors.password.format}
            helperText={state.errors.password.format ? 'al menos un caracter' : ''}
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
            onChange={(event) =>
              setState(
                update(state, { passwordRepeated: { $set: event.target.value }, errors: { password: { missmatch: { $set: false } } } })
              )
            }
            error={state.errors.password.missmatch}
            helperText={state.errors.password.missmatch ? 'no coinciden' : ''}
            disabled={state.disabled}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={state.disabled}>
            Enviar nueva contraseña
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar state={state} onClose={() => props.history.push('/')} />
    </Container>
  )
}

PasswordChange.propTypes = { match: PropTypes.object, history: PropTypes.object }

export default withRouter(PasswordChange)
