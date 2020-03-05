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

import Copyright from '../../components/Copyright'

import { changePasswordWithToken } from '../../services/User'
import Modal from '@material-ui/core/Modal'

const PasswordChange = props => {
  const [password, setPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')
  const [isPasswordErrorActive, setIsPasswordErrorActive] = useState(false)

  const [modalState, setModalState] = useState({ open: false, text: '' })

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
        <form
          className="Form"
          noValidate
          onSubmit={async event => {
            event.preventDefault()
            if (password && password === passwordRepeated) {
              const isPasswordChanged = await changePasswordWithToken(password, props.match.params.token)
              if (isPasswordChanged) {
                setModalState({ open: true, text: 'La contraseña ha sido cambiada con éxito.' })
              } else {
                setModalState({ open: true, text: 'Ha ocurrido un error, los enlaces caducan rápidamente, vuelva a intentarlo de nuevo.' })
              }
            } else {
              setIsPasswordErrorActive(true)
            }
          }}
        >
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
            value={password}
            onChange={event => {
              setPassword(event.target.value)
              setIsPasswordErrorActive(false)
            }}
            error={!password}
            helperText={!password ? 'al menos un caracter' : ''}
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
            value={passwordRepeated}
            onChange={event => {
              setPasswordRepeated(event.target.value)
              setIsPasswordErrorActive(false)
            }}
            error={isPasswordErrorActive}
            helperText={isPasswordErrorActive ? 'no coinciden' : ''}
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
      <Modal id="Modal" open={modalState.open} onClose={() => props.history.push('/')}>
        <div id="ModalContent">
          <p>{modalState.text}</p>
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
