import React from "react"
import SlideCard from "./SlideCard"

const SliderHome = ({Sdata}) => {
  return (
    <>
      <section className='homeSlide'>
        <div className='container'>
          <SlideCard Sdata={Sdata} />
        </div>
      </section>
    </>
  )
}

export default SliderHome
