import React, { useState } from 'react'

import { withRouter } from 'react-router'

import './Signup.style.scss'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Copyright from '../../components/Copyright'
import PropTypes from 'prop-types'

const Signup = props => {
  const [names, setNames] = useState('')
  const [surnames, setSurnames] = useState('')
  const [email, setEmail] = useState(props.emailState.email)
  const [password, setPassword] = useState('')
  const [checkbox, setCheckbox] = useState(false)
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
        <form
          className="Form"
          noValidate
          onSubmit={event => {
            props.emailState.setEmail(email)
            props.history.push('/')
            event.preventDefault()
          }}
        >
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
                defaultValue={names}
                onChange={event => setNames(event.target.value)}
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
                defaultValue={surnames}
                onChange={event => setSurnames(event.target.value)}
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
                defaultValue={email}
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="current-password"
                variant="outlined"
                required
                fullWidth
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                defaultValue={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Acepto recibir inspiración, promociones y actualizaciones; en forma de correos electrónicos."
                id="Checkbox"
                defaultValue={checkbox}
                onChange={event => setCheckbox(event.target.value)}
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
  emailState: PropTypes.shape({
    email: PropTypes.string,
    setEmail: PropTypes.func
  }),
  history: PropTypes.object
}

export default withRouter(Signup)
