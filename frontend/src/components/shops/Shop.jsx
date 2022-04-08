import React from "react"
import Catg from "./Catg"
import ShopCart from "./ShopCart"
import "./style.css"

const Shop = ({ addToCart, shopItems }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container'>
            <div className='heading  f_flex'>
            <i class="fa-solid fa-mobile-screen-button"></i>
            <h1>Mobile Phones</h1>
            </div>
            <div className='product-content  grid1'>
              <ShopCart addToCart={addToCart} shopItems={shopItems} />
            </div>
        </div>
      </section>
    </>
  )
}

export default Shop
