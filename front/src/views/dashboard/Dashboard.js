import React from 'react'

import PropTypes from 'prop-types'

import './Dashboard.styles.scss'

import Logo from '../../images/logo.png'

import Img1 from '../../images/1.jpg'
import Img2 from '../../images/2.jpg'
import Img3 from '../../images/3.jpg'
import Img4 from '../../images/4.jpg'
import Img5 from '../../images/5.jpg'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Slider from 'react-slick'

import Copyright from '../../components/Copyright'

const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

const Dashboard = props => {
  return (
    <React.Fragment>
      <AppBar position="static" id="AppBar">
        <Toolbar>
          <img src={Logo} alt="Logo" />
          <Typography variant="h6" className="Title">
            Main
          </Typography>
          <Button>{props.loginState.email}</Button>
          <Button
            onClick={() => {
              props.loginState.setEmail('')
              props.loginState.setToken('')
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container className="MainContainer">
        <Slider {...settings}>
          <img src={Img1} className="SliderPictures" alt="" />
          <img src={Img2} className="SliderPictures" alt="" />
          <img src={Img3} className="SliderPictures" alt="" />
          <img src={Img4} className="SliderPictures" alt="" />
          <img src={Img5} className="SliderPictures" alt="" />
        </Slider>
      </Container>
      <Box mt={8}>
        <Copyright />
      </Box>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  loginState: PropTypes.shape({
    email: PropTypes.string,
    setEmail: PropTypes.func,
    setToken: PropTypes.func
  }),
  eventState: PropTypes.object
}

export default Dashboard
