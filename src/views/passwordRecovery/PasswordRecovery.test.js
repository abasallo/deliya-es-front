import React from 'react'

import { shallow } from 'enzyme'

import PasswordRecovery from './PasswordRecovery'

test('Renders properly', () => expect(shallow(<PasswordRecovery />)).toMatchSnapshot())
