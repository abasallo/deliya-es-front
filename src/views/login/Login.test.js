import React from 'react'

import { shallow } from 'enzyme'

import Login from './Login'

test('Renders properly', () => expect(shallow(<Login appState={{ email: 'alvaro@basallo.es' }} />)).toMatchSnapshot())
