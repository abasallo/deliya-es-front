import React, { Suspense, useState } from 'react'

import { CookiesProvider, withCookies } from 'react-cookie'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PropTypes from 'prop-types'

import { ApolloProvider } from 'react-apollo'
import { apolloClient } from './services/graphql/apolloClient'

import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { customMUITheme } from './customMUITheme'

import { AuthenticationContext } from './AuthenticationContext'

import CarouselDashboard from './views/carouselDashboard/CarouselDashboard'
import Login from './views/login/Login'
import Signup from './views/signup/Signup'
import PasswordRecovery from './views/passwordRecovery/PasswordRecovery'
import PasswordChange from './views/passwordChange/PasswordChange'

const App = (props) => {
  const [state, setState] = useState({
    email: props.cookies.get('email') ? props.cookies.get('email') : '',
    token: props.cookies.get('token') ? props.cookies.get('token') : ''
  })
  return (
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={customMUITheme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <CookiesProvider>
            <AuthenticationContext.Provider value={{ authenticationContext: { state: state, setState: (_) => setState(_) } }}>
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
                      <Login fromUserActivationEmail="true" />
                    </Route>
                    <Route path="/">{state.email && state.token ? <CarouselDashboard /> : <Login />}</Route>
                  </Switch>
                </Suspense>
              </Router>
            </AuthenticationContext.Provider>
          </CookiesProvider>
        </StylesProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

App.propTypes = { cookies: PropTypes.object }

export default withCookies(App)
