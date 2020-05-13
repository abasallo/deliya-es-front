import React from 'react'

import { shallow } from 'enzyme'

import CookDashboard from './CookDashboard'

test('Renders properly', () => expect(shallow(<CookDashboard />)).toMatchSnapshot())
