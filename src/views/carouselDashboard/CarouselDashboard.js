import React from 'react'

import { withCookies } from 'react-cookie'

import PropTypes from 'prop-types'

import logo from '../../images/logo.png'

import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import { AppBar, Logo, HeaderLoginButtons, Container, CopyrightBox } from './CarouselDashboard.styled.components'

import Copyright from '../../components/Copyright/Copyright'
import Carousel from '../../components/Carousel/Carousel'

import { withAuthenticationContext } from '../../withAuthenticationContext'

const CarouselDashboard = (props) => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Logo src={logo} alt="Logo" />
          <HeaderLoginButtons>
            <Button>{props.authenticationContext.state.email}</Button>
            <Button
              onClick={() => {
                props.authenticationContext.setState({ email: '', token: '' })
                props.cookies.set('email', '')
                props.cookies.set('token', '')
              }}
            >
              Logout
            </Button>
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

CarouselDashboard.propTypes = {
  authenticationContext: PropTypes.object,
  eventState: PropTypes.object,
  cookies: PropTypes.object
}

export default withCookies(withAuthenticationContext(CarouselDashboard))
