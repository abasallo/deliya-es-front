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

import { addUser } from '../../services/User'
import { isEmailValid } from '../../modules'

const Signup = props => {
  const [names, setNames] = useState('')
  const [surnames, setSurnames] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')
  const [isEmailContactAllowed, setIsEmailContactAllowed] = useState(false)

  const [isNamesErrorActive, setIsNamesErrorActive] = useState(false)
  const [isSurnamesErrorActive, setIsSurnamesErrorActive] = useState(false)
  const [isEmailErrorActive, setIsEmailErrorActive] = useState(false)
  const [isPasswordErrorActive, setIsPasswordErrorActive] = useState(false)

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
          onSubmit={async event => {
            event.preventDefault()

            setIsNamesErrorActive(!names)
            setIsSurnamesErrorActive(!surnames)
            setIsEmailErrorActive(!email || !isEmailValid(email))
            setIsPasswordErrorActive(!password || password !== passwordRepeated)

            if (!isNamesErrorActive && !isSurnamesErrorActive && !isEmailErrorActive && !isPasswordErrorActive) {
              const user = await addUser({ names, surnames, email, password, isEmailContactAllowed })
              if (user) {
                props.loginState.setEmail(user.email)
                props.history.push('/')
              }
            }
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
                onChange={event => {
                  setNames(event.target.value)
                  setIsNamesErrorActive(false)
                }}
                error={isNamesErrorActive}
                helperText={isNamesErrorActive ? '¿cómo te llamas?' : ''}
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
                onChange={event => {
                  setSurnames(event.target.value)
                  setIsSurnamesErrorActive(false)
                }}
                error={isSurnamesErrorActive}
                helperText={isSurnamesErrorActive ? '¿cómo te apellidas? :-)' : ''}
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
                onChange={event => {
                  setEmail(event.target.value)
                  setIsEmailErrorActive(false)
                }}
                error={isEmailErrorActive}
                helperText={isEmailErrorActive ? 'no válido' : ''}
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
                defaultValue={password}
                onChange={event => {
                  setPassword(event.target.value)
                  setIsPasswordErrorActive(false)
                }}
                error={!password}
                helperText={!password ? 'al menos un caracter' : ''}
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
                defaultValue={passwordRepeated}
                onChange={event => {
                  setPasswordRepeated(event.target.value)
                  setIsPasswordErrorActive(false)
                }}
                error={isPasswordErrorActive}
                helperText={isPasswordErrorActive ? 'no coinciden' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                id="Checkbox"
                control={<Switch checked={isEmailContactAllowed} onChange={event => setIsEmailContactAllowed(event.target.checked)} />}
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
  loginState: PropTypes.shape({
    setEmail: PropTypes.func
  }),
  history: PropTypes.object
}

export default withRouter(Signup)
