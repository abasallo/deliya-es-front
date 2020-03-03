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

const PasswordChange = props => {
  const [password, setPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')

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
            if (password === passwordRepeated) {
              const isPasswordChange = await changePasswordWithToken(password, props.match.params.token)
              console.log(`password changed? ${isPasswordChange}`)
            }
            props.history.push('/')
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
            onChange={event => setPassword(event.target.value)}
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
            onChange={event => setPasswordRepeated(event.target.value)}
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
    </Container>
  )
}

PasswordChange.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(PasswordChange)
