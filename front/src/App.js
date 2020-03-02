import React, { Suspense, useState } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline'

import Dashboard from './views/dashboard/Dashboard'
import Login from './views/login/Login'
import Signup from './views/signup/Signup'

import PasswordRecovery from './views/passwordRecovery/PasswordRecovery'

const App = () => {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')

  return (
    <React.Fragment>
      <CssBaseline />
      <Suspense fallback={<div>Cargando...</div>}>
        <Router>
          <Switch>
            <Route path="/password-recovery">
              <PasswordRecovery loginState={{ setEmail }} />
            </Route>
            <Route path="/signup">
              <Signup loginState={{ setEmail }} />
            </Route>
            <Route path="/">
              {email && token ? <Dashboard loginState={{ email, setEmail, setToken }} /> : <Login loginState={{ setEmail, setToken }} />}
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  )
}

App.propTypes = {
  eventState: PropTypes.object
}

export default App
