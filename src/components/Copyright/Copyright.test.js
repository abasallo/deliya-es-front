import React from 'react'

import { shallow } from 'enzyme'

import Copyright from './Copyright'

test('Renders properly', () => expect(shallow(<Copyright />)).toMatchSnapshot())
