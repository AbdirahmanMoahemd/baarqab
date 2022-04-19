import React from "react"
import { Link } from "react-router-dom"
import "./style.css"
import TopCart from "./TopCart"

const TopCate = ({categories}) => {
  return (
    <>
      <section className='TopCate background'>
        <div className='container flex-center'>
           <div className='heading f_flex'>
            <i className='fa-solid fa-border-all'></i>
            <Link to='/products'><h1>Top Categories</h1></Link>
          </div>
          <div >
            <TopCart categories={categories} />
            </div>
        </div>
      </section>
    </>
  )
}

export default TopCate
