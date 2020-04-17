import React from 'react'

import { shallow } from 'enzyme'

import Snackbar from './Snackbar'

test('Renders properly', () =>
  expect(shallow(<Snackbar state={{ snackbar: { open: false, text: '' } }} onClose={() => {}} />)).toMatchSnapshot())
