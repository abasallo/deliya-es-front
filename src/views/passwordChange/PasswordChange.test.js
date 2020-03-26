import React from 'react'

import { shallow } from 'enzyme'

import PasswordChange from './PasswordChange'

test('Renders properly', () => expect(shallow(<PasswordChange />)).toMatchSnapshot())
