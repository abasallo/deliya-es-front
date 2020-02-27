import React, { useState } from 'react'

import { withRouter } from 'react-router'

import './PasswordRecovery.scss'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright'
import PropTypes from 'prop-types'

const PasswordRecovery = props => {
  const [email, setEmail] = useState('')

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
          onSubmit={event => {
            // TODO - Send data to server
            props.history.push('/')
            event.preventDefault()
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
    </Container>
  )
}

PasswordRecovery.propTypes = {
  loginState: PropTypes.shape({
    email: PropTypes.string,
    setEmail: PropTypes.func
  }),
  history: PropTypes.object
}

export default withRouter(PasswordRecovery)
