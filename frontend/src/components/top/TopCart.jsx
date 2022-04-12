import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"

const TopCart = ({categories}) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [{
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 1
        }
      }]
  }
  return (
    <>
      <Slider {...settings}>
        {categories.map((value) => {
          return (
            <>
              <div className='box category-new-box' key={value.id}>
                <Link to='/products'>
                <div className='img-cat'>
                  <img src={value.icon} alt='' />
                  </div>
                  </Link>
                <div className='nametop'>
                  <span className='tright'>{value.name}</span>
                </div>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default TopCart
