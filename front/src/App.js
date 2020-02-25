import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline'

import Dashboard from './views/dashboard/Dashboard'
import Login from './views/login/Login'
import Signup from './views/signup/Signup'

import PasswordRecovery from './views/passwordRecovery/PasswordRecovery'

const App = props => {
  const [email, setEmail] = useState('')
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/password-recovery">
            <PasswordRecovery emailState={{ email, setEmail }} />
          </Route>
          <Route path="/signup">
            <Signup emailState={{ email, setEmail }} />
          </Route>
          <Route path="/">
            {email ? (
              <Dashboard emailState={{ email, setEmail }} eventState={props.eventState} />
            ) : (
              <Login emailState={{ email, setEmail }} />
            )}
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  eventState: PropTypes.object
}

export default App
