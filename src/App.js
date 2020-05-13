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

import CookDashboard from './views/cookDashboard/CookDashboard'
import CarouselDashboard from './views/carouselDashboard/CarouselDashboard'
import Login from './views/login/Login'
import SignUp from './views/signUp/SignUp'
import PasswordRecovery from './views/passwordRecovery/PasswordRecovery'
import PasswordChange from './views/passwordChange/PasswordChange'

import constants from './modules/constants'

const initialState = (props) => ({
  email: props.cookies.get(constants.COOKIE_AUTHENTICATION_EMAIL) ? props.cookies.get(constants.COOKIE_AUTHENTICATION_EMAIL) : '',
  token: props.cookies.get(constants.COOKIE_AUTHENTICATION_TOKEN) ? props.cookies.get(constants.COOKIE_AUTHENTICATION_TOKEN) : '',
  isACook: props.cookies.get(constants.COOKIE_IS_A_COOK) ? props.cookies.get(constants.COOKIE_IS_A_COOK) : undefined
})

const rootRouter = (state) => {
  if (state.email && state.token) {
    return state.isACook ? <CookDashboard /> : <CarouselDashboard />
  } else {
    return <Login />
  }
}

const App = (props) => {
  const [state, setState] = useState(initialState(props))
  return (
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={customMUITheme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <CookiesProvider>
            <AuthenticationContext.Provider value={{ authenticationContext: { state: state, setState: (_) => setState(_) } }}>
              <Router>
                <Suspense fallback={<div>{constants.SUSPENSE_FALLBACK_TEXT}</div>}>
                  <Switch>
                    <Route path={constants.PATH_PASSWORD_CHANGE}>
                      <PasswordChange />
                    </Route>
                    <Route path={constants.PATH_PASSWORD_RECOVERY}>
                      <PasswordRecovery />
                    </Route>
                    <Route path={constants.PATH_SIGN_UP}>
                      <SignUp appState={state} />
                    </Route>
                    <Route path={constants.PATH_USER_ACTIVATION}>
                      <Login fromUserActivationEmail="true" />
                    </Route>
                    <Route path={constants.PATH_ROOT}>{rootRouter(state)}</Route>
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
