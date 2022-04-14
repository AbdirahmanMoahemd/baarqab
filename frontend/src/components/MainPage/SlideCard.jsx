import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const SlideCard = ({Sdata}) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }
  return (
    <>
      <Slider {...settings}>
        {Sdata.map((value, index) => {
          return (
            <>
              <div className='box d_flex top slide-color' key={index}>
                <div className='right'>
                  <img src={value.image} alt='' />
                </div>
                
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default SlideCard
