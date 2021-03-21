import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  listProductDetails, createProductReview
} from '../actions/productAction'
import Header from '../components/Header'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'



const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const productReview = useSelector((state) => state.productReview)
    const { success:successProductReview, error:errorProductReview } = productReview   

    useEffect(() => {
        if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
    
    history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, {
      rating,
      comment
    }))
  }
    return (
        <>
            <Header />
            
            {loading ? <Loader /> : error ? <Message variant='warning'>{error}</Message> :
                <>
                <Meta title={product.name}/> 
                <div className="small-container single-product">
                    <div className="row">
                        <div className="new-col-2">
                            <img src={product.image} className="small-img" alt={product.name} width="90%" id="product-img" />
                
                        </div>
                        <div className="new-col-2">
                            <p><Link to="/">Home</Link> / {product.name}</p>
                            <h1>{product.name}</h1>
                            <h4>Price: ${product.price}</h4>
                            <h4><Rating
                                value={product.rating}
                                text={` ${product.numReviews} reviews`}
                            /></h4>
                            <h4>Status: {product.countInStock > 0 ? ' Available' : 'Unavailable'}</h4>
                           
                            <div className="qty-add">
                                
                                {product.countInStock > 0 && (
                                    <>
                                    <h4>Qty:</h4>
                                    <select value={qty}
                                        onChange={(e) => setQty(e.target.value)} >
                                        {[...Array(product.countInStock).keys()].map(
                                            (x) => ( 
                                                <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                                </option>
                                            )
                                            )}
                                    </select>  
                                        </>
                                )}
                        <button className="btns" disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to cart</button>
                        </div>
                            <h3 >Product Details <i className="fa fa-indent"></i></h3>
                            <p>{product.description}.</p>
                            
                            
                        </div>
                    </div>
                <h2>Reviews</h2>
                          <span className="cart-message">{product.reviews.length === 0 && <Message>No Reviews</Message>}</span>
                            <>
                                {product.reviews.map((review) => (
                                <div key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p> 
                                </div>
                                ))}
                    </>
                {errorProductReview && (<Message variant='danger'>{errorProductReview}</Message>)}
                      {userInfo ? ( 
                    <div className="form">
        <div className="login-form">
           
                <strong>Write a Customer Review</strong>
                           
                <form onSubmit={submitHandler}>
                  <label for="cars">Rating:</label>
                <select name="cars" id="cars" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair </option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                </select>               
                <textarea  type="textArea" style={{ rows:"4", cols:"50" }} placeholder="write your comment here..." required
                value={comment} onChange={(e) => setComment(e.target.value)}
                />
                
                                <button type="sumbit" style={{ width: '50%' }} className="btns">submit</button>
                                </form>
                     
         
                         </div>
                        </div>
                     ): <Message>Please <Link to='/login'> sign in </Link> to write a review</Message>}
                    </div>
                     </>
            }
            <p className="wt">.</p> 
                            <p className="wt">.</p> 
            </>
                    
    )
}

export default ProductScreen
