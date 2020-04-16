import React, { Suspense, useState } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'
import { apolloClient } from './services/graphql/apolloClient'

import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import { customMUITheme } from './customMUITheme'

import CssBaseline from '@material-ui/core/CssBaseline'

import CarouselDashboard from './views/dashboard/CarouselDashboard'
import Login from './views/login/Login'
import Signup from './views/signup/Signup'
import PasswordRecovery from './views/passwordRecovery/PasswordRecovery'
import PasswordChange from './views/passwordChange/PasswordChange'

const App = () => {
  const [state, setState] = useState({ email: '', token: '' })
  const setAppState = (state) => setState(state)

  return (
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={customMUITheme}>
        <StylesProvider injectFirst>
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
                <Route path="/user-activation/:token">
                  <Login fromUserActivationEmail="true" appState={state} setAppState={setAppState} />
                </Route>
                <Route path="/">
                  {state.email && state.token ? (
                    <CarouselDashboard appState={state} setAppState={setAppState} />
                  ) : (
                    <Login appState={state} setAppState={setAppState} />
                  )}
                </Route>
              </Switch>
            </Suspense>
          </Router>
        </StylesProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

export default App
