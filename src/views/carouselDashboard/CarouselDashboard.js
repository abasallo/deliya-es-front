import React from 'react'

import { withCookies } from 'react-cookie'

import PropTypes from 'prop-types'

import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import { withAuthenticationContext } from '../../withAuthenticationContext'

import logo from '../../images/logo.png'

import { AppBar, Logo, HeaderLoginButtons, Container, CopyrightBox } from './CarouselDashboard.styled.components'

import Copyright from '../../components/Copyright/Copyright'
import Carousel from '../../components/Carousel/Carousel'

import constants from '../../modules/constants'

const CarouselDashboard = (props) => {
  const onClick = () => {
    props.authenticationContext.setState({ email: '', token: '' })
    props.cookies.set(constants.COOKIE_AUTHENTICATION_EMAIL, '')
    props.cookies.set(constants.COOKIE_AUTHENTICATION_TOKEN, '')
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Logo src={logo} alt={constants.LOGO_ALT} />
          <HeaderLoginButtons>
            <Button>{props.authenticationContext.state.email}</Button>
            <Button onClick={onClick}>{constants.LOGOUT}</Button>
          </HeaderLoginButtons>
        </Toolbar>
      </AppBar>
      <Container>
        <Carousel />
      </Container>
      <CopyrightBox mt={8}>
        <Copyright />
      </CopyrightBox>
    </React.Fragment>
  )
}

CarouselDashboard.propTypes = { authenticationContext: PropTypes.object, eventState: PropTypes.object, cookies: PropTypes.object }

export default withCookies(withAuthenticationContext(CarouselDashboard))
