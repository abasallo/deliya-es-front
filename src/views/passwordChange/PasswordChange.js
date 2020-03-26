import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import { AvatarContainer, Button, Modal } from './PasswordChange.styled.components'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright/Copyright'

import { changePasswordWithToken } from '../../services/graphql/User'

const PasswordChange = (props) => {
  const [state, setState] = useState({
    password: '',
    passwordRepeated: '',
    passwordMismatch: false,
    modal: { open: false, text: '' }
  })

  const onSubmit = async (event) => {
    event.preventDefault()
    if (state.password && state.password === state.passwordRepeated) {
      const isPasswordChanged = await changePasswordWithToken(state.password, props.match.params.token)
      if (isPasswordChanged) setState({ ...state, modal: { open: true, text: 'La contraseña ha sido cambiada con éxito.' } })
      else setState({ ...state, modal: { open: true, text: 'Error, los enlaces caducan rápidamente, vuelva a intentarlo de nuevo.' } })
    } else setState({ ...state, passwordMismatch: true })
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
            onChange={(event) => setState({ ...state, password: event.target.value, passwordMismatch: false })}
            error={!state.password}
            helperText={!state.password ? 'al menos un caracter' : ''}
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
            onChange={(event) => setState({ ...state, passwordRepeated: event.target.value, passwordMismatch: false })}
            error={state.passwordMismatch}
            helperText={state.passwordMismatch ? 'no coinciden' : ''}
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            Enviar nueva contraseña
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Modal open={state.modal.open} onClose={() => props.history.push('/')}>
        <div>{state.modal.text}</div>
      </Modal>
    </Container>
  )
}

PasswordChange.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(PasswordChange)
