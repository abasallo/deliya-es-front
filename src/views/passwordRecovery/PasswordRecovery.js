import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import { AvatarContainer, Button, Modal } from './PasswordRecovery.styled.components'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright/Copyright'

import { requestPasswordRecoveryUrlOverEmail } from '../../services/graphql/User'

const PasswordRecovery = props => {
  const [state, setState] = useState({ email: '', modal: { open: false } })

  const onSubmit = async event => {
    event.preventDefault()
    if (await requestPasswordRecoveryUrlOverEmail(state.email)) setState({ ...state, modal: { open: true } })
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
          onChange={event => setState({ email: event.target.value, modal: { open: false } })}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Enviar correo de recuperación
        </Button>
      </form>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Modal open={state.modal.open} onClose={() => props.history.push('/')}>
        <div>
          <p>Se ha enviado un correo a la dirección electrónica indicada</p>
          <p>con instrucciones para crear una nueva contraseña.</p>
        </div>
      </Modal>
    </Container>
  )
}

PasswordRecovery.propTypes = {
  history: PropTypes.object
}

export default withRouter(PasswordRecovery)
