import React from 'react'

import { shallow } from 'enzyme'

import YesNoButtonGroup from './YesNoButtonGroup'

test('Renders properly', () => expect(shallow(<YesNoButtonGroup />)).toMatchSnapshot())
