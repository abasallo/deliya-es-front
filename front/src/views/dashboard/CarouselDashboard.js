import React from 'react'

import PropTypes from 'prop-types'

import logo from '../../images/logo.png'

import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import { AppBar, Logo, HeaderLoginButtons, Container, CopyrightBox } from './CarouselDashboard.styled.components'

import Copyright from '../../components/Copyright/Copyright'
import Carousel from '../../components/Carousel/Carousel'

const CarouselDashboard = props => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Logo src={logo} alt="Logo" />
          <HeaderLoginButtons>
            <Button>{props.appState.email}</Button>
            <Button onClick={() => props.setAppState({ email: '', token: '' })}>Logout</Button>
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
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  eventState: PropTypes.object
}

export default CarouselDashboard
