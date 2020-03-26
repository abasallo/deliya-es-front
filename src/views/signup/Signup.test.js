import React from 'react'

import { shallow } from 'enzyme'

import Signup from './Signup'

test('Renders properly', () => expect(shallow(<Signup />)).toMatchSnapshot())
