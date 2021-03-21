import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from './Loader'
import Message from './Message'
const Products = ({ product }) => {
    
    return (
       <>
            {/* {(  */}
         <>
         <div className="product-img"> 
                    <Link to="/cart" className="add-cart">
                        <i className="fa fa-shopping-cart"></i>
                    </Link>
                    <Link to={`/product/${product._id}`}>
                    <img src={product.image}/>
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
                 {/* )
                } */}
               
                
            
        </>
    )
}

export default Products


 