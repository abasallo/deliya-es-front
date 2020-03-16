import React from 'react'

import { SliderContainer, SliderPicture } from './CarouselSlider.styled.components'

import Img1 from '../../images/data/1.jpg'
import Img2 from '../../images/data/2.jpg'
import Img3 from '../../images/data/3.jpg'
import Img4 from '../../images/data/4.jpg'

const CarouselSlider = () => {
  const settings = {
    accessibility: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    draggable: true,
    fade: true,
    infinite: true,
    pauseOnDotsHover: true,
    pauseOnHover: true
  }

  return (
    <SliderContainer {...settings}>
      <SliderPicture src={Img1} alt="" />
      <SliderPicture src={Img2} alt="" />
      <SliderPicture src={Img3} alt="" />
      <SliderPicture src={Img4} alt="" />
    </SliderContainer>
  )
}

export default CarouselSlider
