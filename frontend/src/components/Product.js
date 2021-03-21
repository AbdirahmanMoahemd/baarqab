import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
const Product = ({ product, history, match }) => {

    return (
    <>
            {/* {product.category === 'Dhar' && ( */}
                <>
             
                    <div className="product-img"> 
                        <Link to={`/product/${product._id}`} className="add-cart">
                            <i className="fa fa-shopping-cart"></i>
                        </Link>
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} />
                        </Link>
                    </div>
                    <div className="product-details">
                        <Link to={`/product/${product._id}`} className="p-name">{product.name}</Link>
                        <div className="rating">
                            <Rating
                                value={product.rating}
                                text={` ${product.numReviews} reviews`}
                            />
                        </div>
                        <span className="p-price">{product.price}</span>
                    </div>
            
                </>
            {/* )} */}
         </>
    )
}

export default Product
