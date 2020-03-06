import React, { useState } from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'

import './Signup.style.scss'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright'

import { addUser } from '../../services/graphql/User'
import { isEmailValid } from '../../modules'

const Signup = props => {
  const [state, setState] = useState({
    names: '',
    surnames: '',
    email: '',
    password: '',
    passwordRepeated: '',
    contactAllowed: false,
    errors: {
      names: false,
      surnames: false,
      email: false,
      password: false
    }
  })

  const onSubmit = async event => {
    event.preventDefault()
    setState({
      ...state,
      errors: {
        names: !state.names,
        surnames: !state.surnames,
        email: !state.email || !isEmailValid(state.email),
        password: !state.password || state.password !== state.passwordRepeated
      }
    })

    if (!state.errors.names && !state.errors.surnames && !state.errors.email && !state.errors.password) {
      const user = await addUser({
        names: state.names,
        surnames: state.surnames,
        email: state.email,
        password: state.password,
        contactAllowed: state.contactAllowed
      })
      if (user) {
        props.history.push('/')
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="Paper">
        <div className="Avatar">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Alta
          </Typography>
        </div>
        <form className="Form" noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="names"
                name="names"
                label="Nombre/s"
                autoFocus
                defaultValue={state.names}
                onChange={event => setState({ ...state, names: event.target.value, errors: { ...state.errors, names: false } })}
                error={state.errors.names}
                helperText={state.errors.names ? '¿cómo te llamas?' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                variant="outlined"
                required
                fullWidth
                id="surnames"
                name="surnames"
                label="Apellido/s"
                defaultValue={state.surnames}
                onChange={event => setState({ ...state, surnames: event.target.value, errors: { ...state.errors, surnames: false } })}
                error={state.errors.surnames}
                helperText={state.errors.surnames ? '¿cómo te apellidas? :-)' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                name="email"
                label="Correo electrónico"
                defaultValue={state.email}
                onChange={event => setState({ ...state, email: event.target.value, errors: { ...state.errors, email: false } })}
                error={state.errors.email}
                helperText={state.errors.email ? 'no válido' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                variant="outlined"
                required
                fullWidth
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                defaultValue={state.password}
                onChange={event => setState({ ...state, password: event.target.value, errors: { ...state.errors, password: false } })}
                error={!state.password}
                helperText={!state.password ? 'al menos un caracter' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                variant="outlined"
                required
                fullWidth
                id="password-retyped"
                name="password-retyped"
                label="Contraseña (otra vez)"
                type="password"
                defaultValue={state.passwordRepeated}
                onChange={event =>
                  setState({ ...state, passwordRepeated: event.target.value, errors: { ...state.errors, passwordRepeated: false } })
                }
                error={state.errors.password}
                helperText={state.errors.password ? 'no coinciden' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                id="Checkbox"
                control={
                  <Switch checked={state.contactAllowed} onChange={event => setState({ ...state, contactAllowed: event.target.checked })} />
                }
                label="Acepto recibir inspiración, promociones y actualizaciones; en forma de correos electrónicos."
              />
            </Grid>
          </Grid>
          <div className="Button">
            <Button type="submit" fullWidth variant="contained" color="primary">
              Enviar alta
            </Button>
          </div>
          <Grid container justify="center">
            <Grid item>
              <Link href="/" variant="body2">
                ¿Ya tienes cuenta?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

Signup.propTypes = {
  appState: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(Signup)
