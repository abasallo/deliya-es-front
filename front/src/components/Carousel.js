import React from 'react'

import './Carousel.styles.scss'

import Img1 from '../images/1.jpg'
import Img2 from '../images/2.jpg'
import Img3 from '../images/3.jpg'
import Img4 from '../images/4.jpg'
import Img5 from '../images/5.jpg'

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
      <img src={Img1} className="SliderPictures" alt="" />
      <img src={Img2} className="SliderPictures" alt="" />
      <img src={Img3} className="SliderPictures" alt="" />
      <img src={Img4} className="SliderPictures" alt="" />
      <img src={Img5} className="SliderPictures" alt="" />
    </Slider>
  )
}

export default Carousel
