import React, { useState, useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../../components/Rating'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {
  listProductDetails, createProductReview, listProducts2
} from '../../actions/productAction'
import Header from '../../components/Header'

import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import Meta from '../../components/Meta'
import pimg1 from '../../images/imgae/apple.png';
import pimg2 from '../../images/imgae/chili.png';
import pimg3 from '../../images/imgae/onion.png';
import pimg4 from '../../images/imgae/patato.png';
import pimg5 from '../../images/imgae/garlic.png';
import pimg6 from '../../images/imgae/tamato.png';
import { InputNumber } from 'primereact/inputnumber';




const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

//     const imgs = document.querySelectorAll('.img-select a');
//    const imgShowcase = useRef(null); 
//    const imgBtns = [...imgs];
//    let imgId = 1;
    const dispatch = useDispatch() 
    const productList = useSelector(state => state.productList) 
    const {  products } = productList

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const productReview = useSelector((state) => state.productReview)
    const { success:successProductReview, error:errorProductReview } = productReview   

    
    // imgBtns.forEach((imgItem) => {
    // imgItem.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     imgId = imgItem.dataset.id;
    //     slideImage();
    // });
    // });



    // function slideImage(){
    // const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    //     imgShowcase.current.style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    // }

    useEffect(() => {
        if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
        dispatch(listProductDetails(match.params.id))
         dispatch(listProducts2())
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
            <>
                <div class="small-container single-product">
         <div class="row">
             <div class="col-2-d">
                 <img src={product.image} class="small-img" width="90%"  id="product-img"/>
                {/* <div class="small-img-row">
                    <div class="small-img-col">
                        <img src={pimg1} class="small-img" width="90%"/>
                    </div>
                    <div class="small-img-col">
                        <img src={pimg2} class="small-img" width="90%"/>
                    </div>
                    <div class="small-img-col">
                        <img src={pimg3} class="small-img" width="90%"/>
                    </div>
                    <div class="small-img-col">
                        <img src={pimg4} class="small-img" width="90%"/>
                    </div>
                    
                </div> */}
             </div>
             <div class="col-2-d">
                 <p>Home / T-Shirt</p>
                 <h1>Read Printed T-Shirt by HRX</h1>
                 <h4>$50.0</h4>
                 
                 {product.countInStock > 0 && (
                                <>
                                    <span className="qty-and-input">
                                    <h4>Qty:</h4>
                                <InputNumber value={qty} style={{ marginRight: "10px", marginLeft: "10px" }} showButtons buttonLayout="horizontal"
                                                            decrementButtonClassName="p-button-danger"
                                                            incrementButtonClassName="p-button-success"
                                                            incrementButtonIcon="pi pi-plus"
                                                            decrementButtonIcon="pi pi-minus"
                                                            max={product.countInStock}
                                                            min="1"
                                                            onValueChange={(e) => setQty(e.target.value)} showButtons
                                            
                                        
                                        />
                                        </span>
                                        </>
                                )}
                               <br/>
                 <a  class="btn" disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to cart</a>
                 <h3>Product Details <i class="fa fa-indent"></i></h3>
                 <br/>
                 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
             </div>
         </div> 
     </div>

     <div class="small-container">
         <div class="row row-2">
         <h2>Related Products</h2>
         <p>View More</p>
        </div>
     </div>
     <div class="small-container">
                   <div class="product-container">
                        {products.map(pro => (
                            <div class="product-box">
                                
                                         <img alt="apple" src={pro.image} />
                                    
                                   
                                    <strong>{pro.name}</strong>
                                    <span class="price">{pro.price}$</span>
                                    <Link to={`/product/${pro.id}`} className="add-cart">
                                        <a href="#" class="cart-btn">
                                        <i class="fas fa-shopping-bag"></i> Add Cart
                                         </a>
                                    </Link>
                                    <a href="#" class="like-btn">
                                        <i class="far fa-heart"></i>
                                    </a>
                                </div>
                        ))}
           
           
           
       </div>
     </div>
            </>
            
            </>
                    
    )
}

export default ProductScreen


// {loading ? <Loader /> : error ? <Message variant='warning'>{error}</Message> :
//                 <>
//                 <Meta title={product.name}/> 
//                 <div className="small-container single-product">
//                     <div className="row">
//                         <div className="new-col-2">
//                             <img src={product.image} className="small-img" alt={product.name} width="90%" id="product-img" />
                
//                         </div>
//                         <div className="new-col-2">
//                             <p><Link to="/">Home</Link> / {product.name}</p>
//                             <h1>{product.name}</h1>
//                             <h4>Price: ${product.price}</h4>
//                             <h4><Rating
//                                 value={product.rating}
//                                 text={` ${product.numReviews} reviews`}
//                             /></h4>
//                             <h4>Status: {product.countInStock > 0 ? ' Available' : 'Unavailable'}</h4>
                           
//                             <div className="qty-add">
                                
//                                 {product.countInStock > 0 && (
//                                     <>
//                                     <h4>Qty:</h4>
//                                     <select value={qty}
//                                         onChange={(e) => setQty(e.target.value)} >
//                                         {[...Array(product.countInStock).keys()].map(
//                                             (x) => ( 
//                                                 <option key={x + 1} value={x + 1}>
//                                                 {x + 1}
//                                                 </option>
//                                             )
//                                             )}
//                                     </select>  
//                                         </>
//                                 )}
//                         <button className="btns" disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to cart</button>
//                         </div>
//                             <h3 >Product Details <i className="fa fa-indent"></i></h3>
//                             <p>{product.description}.</p>
                            
                            
//                         </div>
//                     </div>
//                 <h2>Reviews</h2>
//                           <span className="cart-message">{product.reviews.length === 0 && <Message>No Reviews</Message>}</span>
//                             <>
//                                 {product.reviews.map((review) => (
//                                 <div key={review._id}>
//                                     <strong>{review.name}</strong>
//                                     <Rating value={review.rating} />
//                                     <p>{review.createdAt.substring(0, 10)}</p>
//                                     <p>{review.comment}</p> 
//                                 </div>
//                                 ))}
//                     </>
//                 {errorProductReview && (<Message variant='danger'>{errorProductReview}</Message>)}
//                       {userInfo ? ( 
//                     <div className="form">
//         <div className="login-form">
           
//                 <strong>Write a Customer Review</strong>
                           
//                 <form onSubmit={submitHandler}>
//                   <label for="cars">Rating:</label>
//                 <select name="cars" id="cars" value={rating} onChange={(e) => setRating(e.target.value)}>
//                     <option value=''>Select...</option>
//                     <option value='1'>1 - Poor</option>
//                     <option value='2'>2 - Fair </option>
//                     <option value='3'>3 - Good</option>
//                     <option value='4'>4 - Very Good</option>
//                     <option value='5'>5 - Excellent</option>
//                 </select>               
//                 <textarea  type="textArea" style={{ rows:"4", cols:"50" }} placeholder="write your comment here..." required
//                 value={comment} onChange={(e) => setComment(e.target.value)}
//                 />
                
//                                 <button type="sumbit" style={{ width: '50%' }} className="btns">submit</button>
//                                 </form>
                     
         
//                          </div>
//                         </div>
//                      ): <Message>Please <Link to='/login'> sign in </Link> to write a review</Message>}
//                     </div>
//                      </>
//             }
//             <p className="wt">.</p> 
//                             <p className="wt">.</p> 