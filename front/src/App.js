import React, { Suspense, useState } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import Dashboard from './views/dashboard/Dashboard'
import Login from './views/login/Login'
import Signup from './views/signup/Signup'
import PasswordRecovery from './views/passwordRecovery/PasswordRecovery'
import PasswordChange from './views/passwordChange/PasswordChange'

const App = () => {
  const [state, setState] = useState({ email: '', token: '' })
  const setAppState = state => setState(state)

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Cargando...</div>}>
          <Switch>
            <Route path="/password-change/:token">
              <PasswordChange />
            </Route>
            <Route path="/password-recovery">
              <PasswordRecovery />
            </Route>
            <Route path="/signup">
              <Signup appState={state} />
            </Route>
            <Route path="/">
              {state.email && state.token ? (
                <Dashboard appState={state} setAppState={setAppState} />
              ) : (
                <Login appState={state} setAppState={setAppState} />
              )}
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  )
}

export default App
