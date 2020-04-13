import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { AvatarContainer, Button } from './PasswordRecovery.styled.components'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright/Copyright'

import { requestPasswordRecoveryUrlOverEmail } from '../../services/graphql/User'

const PasswordRecovery = (props) => {
  const [state, setState] = useState({ email: '', modal: { open: false, text: '' } })

  const onSubmit = async (event) => {
    event.preventDefault()
    if (await requestPasswordRecoveryUrlOverEmail(state.email)) {
      setState({ ...state, modal: { open: true, text: 'Correo de recuperación de contraseña enviado.' } })
    }
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
          onChange={(event) => setState({ email: event.target.value, modal: { open: false } })}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Enviar correo de recuperación
        </Button>
      </form>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={state.modal.open} autoHideDuration={7000} onClose={() => props.history.push('/')}>
        <Alert onClose={() => props.history.push('/')} severity="success">
          {state.modal.text}
        </Alert>
      </Snackbar>
    </Container>
  )
}

PasswordRecovery.propTypes = { history: PropTypes.object }

export default withRouter(PasswordRecovery)
