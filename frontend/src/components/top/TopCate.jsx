import React from "react"
import "./style.css"
import TopCart from "./TopCart"

const TopCate = () => {
  return (
    <>
      <section className='TopCate background'>
        <div className='container '>
           <div className='heading f_flex'>
            <i className='fa-solid fa-border-all'></i>
            <h1>Top Categories</h1>
          </div>
          <div >
            <TopCart />
            </div>
        </div>
      </section>
    </>
  )
}

export default TopCate
