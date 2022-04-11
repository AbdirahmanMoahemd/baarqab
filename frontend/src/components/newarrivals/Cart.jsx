import React,{ useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../newarrivals/style.css"
import { Link } from "react-router-dom"
import Rating from "../Rating"

const Cart = ({productItems}) => {
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
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    autoplay: true,
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
                <div className='img'>
                  <Link to={`product/${productItems.id}`}>
                    <img src={productItems.image} alt='' />
                    </Link>
                </div>
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
                    <button >
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

export default Cart
