import React from 'react'

import PropTypes from 'prop-types'

import './Dashboard.styles.scss'

import Logo from '../../images/logo.png'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import Copyright from '../../components/Copyright'
import Carousel from '../../components/Carousel'

const Dashboard = props => {
  return (
    <React.Fragment>
      <AppBar position="static" id="AppBar">
        <Toolbar>
          <img src={Logo} alt="Logo" className="Logo" />
          <div className="HeaderLoginButtons">
            <Button>{props.appState.email}</Button>
            <Button onClick={() => props.setAppState({ email: '', token: '' })}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container className="MainContainer">
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
