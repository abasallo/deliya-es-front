import React from 'react'

import { AuthenticationContext } from './AuthenticationContext'

export const withAuthenticationContext = (Component) => (props) => (
  <AuthenticationContext.Consumer>{(context) => <Component {...props} {...context} />}</AuthenticationContext.Consumer>
)
