import React from 'react'

import { withAuthenticationContext } from './withAuthenticationContext'

test('Renders properly', () => expect(withAuthenticationContext(<div>Test</div>)).toMatchSnapshot())
