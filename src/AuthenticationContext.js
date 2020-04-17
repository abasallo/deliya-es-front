import React from 'react'

export const AuthenticationContext = React.createContext({ authenticationContext: { state: { email: '', token: '' }, setState: () => {} } })
