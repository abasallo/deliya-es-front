import React from 'react'

import { shallow } from 'enzyme'

import CarouselDashboard from './CarouselDashboard'

test('Renders properly', () => expect(shallow(<CarouselDashboard appState={{ email: 'alvaro@basallo.es' }} />)).toMatchSnapshot())
