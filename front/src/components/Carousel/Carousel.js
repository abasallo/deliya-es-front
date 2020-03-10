import React from 'react'

import { SliderPicture } from './Carousel.styled.components'

import Img1 from '../../images/data/1.jpg'
import Img2 from '../../images/data/2.jpg'
import Img3 from '../../images/data/3.jpg'
import Img4 from '../../images/data/4.jpg'
import Img5 from '../../images/data/5.jpg'

import Slider from 'react-slick'

const Carousel = () => {
  const settings = {
    accessibility: true,
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <Slider {...settings}>
      <SliderPicture src={Img1} alt="" />
      <SliderPicture src={Img2} alt="" />
      <SliderPicture src={Img3} alt="" />
      <SliderPicture src={Img4} alt="" />
      <SliderPicture src={Img5} alt="" />
    </Slider>
  )
}

export default Carousel
