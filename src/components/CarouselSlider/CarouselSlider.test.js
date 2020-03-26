import React from 'react'

import { shallow } from 'enzyme'

import CarouselSlider from './CarouselSlider'

test('Renders properly', () => expect(shallow(<CarouselSlider />)).toMatchSnapshot())
