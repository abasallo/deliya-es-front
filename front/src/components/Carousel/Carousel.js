import React from 'react'

import TextInfoContent from '@mui-treasury/components/content/textInfo'

import { CarouselCard, CarouselCardContent } from './Carousel.styled.components'

import CarouselSlider from '../CarouselSlider/CarouselSlider'
import YesNoButtonGroup from '../YesNoButtonGroup/YesNoButtonGroup'

const Carousel = () => {
  return (
    <CarouselCard>
      <CarouselSlider />
      <CarouselCardContent>
        <TextInfoContent
          overline={'La cocinera feliz'}
          heading={'Pastelillos variados'}
          body={'Una caja con 12 pastelillos variados, del día, ¡déjate sorprender!'}
        />
      </CarouselCardContent>
      <YesNoButtonGroup />
    </CarouselCard>
  )
}

export default Carousel
