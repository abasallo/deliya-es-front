import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import './PasswordChange.scss'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright/Copyright'

import { changePasswordWithToken } from '../../services/graphql/User'
import Modal from '@material-ui/core/Modal'

const PasswordChange = props => {
  const [state, setState] = useState({
    password: '',
    passwordRepeated: '',
    passwordMismatch: false,
    modal: { open: false, text: '' }
  })

  const onSubmit = async event => {
    event.preventDefault()
    if (state.password && state.password === state.passwordRepeated) {
      const isPasswordChanged = await changePasswordWithToken(state.password, props.match.params.token)
      if (isPasswordChanged) setState({ ...state, modal: { open: true, text: 'La contraseña ha sido cambiada con éxito.' } })
      else setState({ ...state, modal: { open: true, text: 'Error, los enlaces caducan rápidamente, vuelva a intentarlo de nuevo.' } })
    } else setState({ ...state, passwordMismatch: true })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="Paper">
        <div className="Avatar">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cambio de contraseña
          </Typography>
        </div>
        <form className="Form" noValidate onSubmit={onSubmit}>
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
            onChange={event => setState({ ...state, password: event.target.value, passwordMismatch: false })}
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
            onChange={event => setState({ ...state, passwordRepeated: event.target.value, passwordMismatch: false })}
            error={state.passwordMismatch}
            helperText={state.passwordMismatch ? 'no coinciden' : ''}
          />

          <div className="Button">
            <Button type="submit" fullWidth variant="contained" color="primary">
              Enviar nueva contraseña
            </Button>
          </div>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Modal id="Modal" open={state.modal.open} onClose={() => props.history.push('/')}>
        <div id="ModalContent">
          <p>{state.modal.text}</p>
        </div>
      </Modal>
    </Container>
  )
}

PasswordChange.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(PasswordChange)
