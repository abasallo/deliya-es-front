import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import './PasswordRecovery.scss'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright'

import { requestPasswordRecoveryUrlOverEmail } from '../../services/User'
import Modal from '@material-ui/core/Modal'

const PasswordRecovery = props => {
  const [email, setEmail] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Container component="main" maxWidth="xs">
      <div className="Paper">
        <div className="Avatar">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperación de contraseña
          </Typography>
        </div>
        <form
          className="Form"
          noValidate
          onSubmit={async event => {
            event.preventDefault()
            const willEmailBeSent = await requestPasswordRecoveryUrlOverEmail(email)
            if (willEmailBeSent) setIsModalOpen(true)
          }}
        >
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
            value={email}
            onChange={event => {
              setEmail(event.target.value)
            }}
          />
          <div className="Button">
            <Button type="submit" fullWidth variant="contained" color="primary">
              Enviar correo de recuperación
            </Button>
          </div>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Modal id="Modal" open={isModalOpen} onClose={() => props.history.push('/')}>
        <div id="ModalContent">
          <p>Se ha enviado un correo a la dirección electrónica indicada</p>
          <p>con instrucciones para crear una nueva contraseña.</p>
        </div>
      </Modal>
    </Container>
  )
}

PasswordRecovery.propTypes = {
  loginState: PropTypes.shape({
    setEmail: PropTypes.func
  }),
  history: PropTypes.object
}

export default withRouter(PasswordRecovery)
