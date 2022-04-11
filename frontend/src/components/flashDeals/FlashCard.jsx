import React, { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"
import Rating from "../Rating"

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}
const FlashCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }

  var slideToShow = 1
 
  if (productItems.length == 1) {
    slideToShow = 1
  }
  else if (productItems.length == 2) {
    slideToShow = 2
  }
  else if (productItems.length == 3) {
    slideToShow = 3
  }
  else {
    slideToShow = 4
  } 
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [{
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }]
  }

  return (
    <>
      <Slider {...settings}>
        {productItems.map((productItems) => {
          return (
            <div className='space-b-box'>
              <div className='box product mtop '>
                <Link to={`product/${productItems.id}`}>
                <div className='img'>
                  <img src={productItems.image} alt='' />
                  </div>
                  </Link> 
                <div className='product-details'>
                  <h3>{productItems.name}</h3>
                  <div className='rate'>
                    <Rating
                                value={productItems.rating}
                                />
                  </div>
                  <div className='price'>
                    <h4>${productItems.price}.00 </h4>
                    {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                    <button onClick={() => addToCart(productItems)}>
                      <i className='fa fa-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
              </div>
          )
        })}
      </Slider>
    </>
  )
}

export default FlashCard
