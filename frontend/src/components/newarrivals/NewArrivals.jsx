import React from "react"
import Cart from "./Cart"
import "./style.css"

const NewArrivals = ({ productItems }) => {
  return (
    <>
      <section className='NewArrivals background'>
        <div className='container'>
          <div className='heading f_flex'>
              <img src='https://img.icons8.com/glyph-neue/64/26e07f/new.png' />
              <h1>New Arrivals </h1>
            </div>
            
          

          <Cart productItems={productItems} />
        </div>
      </section>
    </>
  )
}

export default NewArrivals
 