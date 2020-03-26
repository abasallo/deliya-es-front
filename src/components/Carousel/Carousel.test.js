import React from 'react'

import { shallow } from 'enzyme'

import Carousel from './Carousel'

test('Renders properly', () => expect(shallow(<Carousel />)).toMatchSnapshot())
