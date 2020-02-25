import React from 'react'

import PropTypes from 'prop-types'

import './Dashboard.styles.scss'

import Logo from '../../images/logo.png'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import DashboardGrid from './DashboardGrid'
import Copyright from '../../components/Copyright'

const Dashboard = props => {
  return (
    <React.Fragment>
      <AppBar position="static" id="AppBar">
        <Toolbar>
          <img src={Logo} alt="Logo" />
          <Typography variant="h6" className="Title">
            Event Dashboard
          </Typography>
          <Button>{props.emailState.email}</Button>
          <Button onClick={() => props.emailState.setEmail('')}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container className="MainContainer">
        <DashboardGrid eventState={props.eventState} />
      </Container>
      <Box mt={8}>
        <Copyright />
      </Box>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  emailState: PropTypes.shape({
    email: PropTypes.string,
    setEmail: PropTypes.func
  }),
  eventState: PropTypes.object
}

export default Dashboard
