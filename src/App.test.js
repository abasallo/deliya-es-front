import React from 'react'

import { shallow } from 'enzyme'

import App from './App'

test('Renders properly', () => expect(shallow(<App />)).toMatchSnapshot())
