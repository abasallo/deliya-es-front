import React from 'react'

import PropTypes from 'prop-types'

import logo from '../../images/logo.png'

import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import Box from '@material-ui/core/Box'

import { AppBar, Logo, HeaderLoginButtons, Container } from './Dashboard.styled.components'

import Copyright from '../../components/Copyright/Copyright'
import Carousel from '../../components/Carousel/Carousel'

const Dashboard = props => {
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
  eventState: PropTypes.object
}

export default Dashboard
