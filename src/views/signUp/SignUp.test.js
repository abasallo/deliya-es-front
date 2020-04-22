import React from 'react'

import { shallow } from 'enzyme'

import SignUp from './SignUp'

test('Renders properly', () => expect(shallow(<SignUp />)).toMatchSnapshot())
