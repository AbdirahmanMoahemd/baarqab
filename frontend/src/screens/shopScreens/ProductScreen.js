import React, { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../../components/Rating'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {
  listProductDetails, createProductReview, listProducts2
} from '../../actions/productAction'
import Header from '../../components/Header'
import { listColors } from '../../actions/colorActions.js'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import Meta from '../../components/Meta'
import pimg1 from '../../images/imgae/apple.png';
import pimg2 from '../../images/imgae/chili.png';
import pimg3 from '../../images/imgae/onion.png';
import pimg4 from '../../images/imgae/patato.png';
import pimg5 from '../../images/imgae/garlic.png';
import pimg6 from '../../images/imgae/tamato.png';
import { InputNumber } from 'primereact/inputnumber';
import './product.css'

import Carousel from 'react-bootstrap/Carousel'
 
 

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    let imagesPool 
    const imgs = document.querySelectorAll('.img-select a');
    const imgShowcase = useRef(null); 
    const imgBtns = [...imgs];
    let imgId = 1;


    const dispatch = useDispatch() 
    const productList = useSelector(state => state.productList) 
    const {  products } = productList

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails
    
    const colorList = useSelector(state => state.colorList) 
    const { loading:colorLoading, error:colorError, colors } = colorList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const productReview = useSelector((state) => state.productReview)
    const { success:successProductReview, error:errorProductReview } = productReview   

    
    imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
    });



    function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
        imgShowcase.current.style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }

    useEffect(() => {
        if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
        dispatch(listProductDetails(match.params.id))
        dispatch(listProducts2())
        dispatch(listColors())
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
             {loading ? ( <Loader /> ) : error ? (<Message variant='danger'>{error}</Message>) : (
        
          <>
           <Meta title={product.name}/> 
            
                <div class="small-container single-product">
         <div class="row">
                            <div class="col-2-d">
                        <div className="img-display"> 
                            <div ref={imgShowcase}  className = "img-showcase">
                        {product.images.map(i => (
                        <img src={i}    class="small-img" width="90%"  id="product-img"/>  
                        ))} 

              
            </div>
                               
                     </div>               
                               
                           
                
                <div class="img-select small-img-row p-mt-3">
                    <div class="img-item small-img-col">
                        <a href = "#" data-id = "1">
                        <img src={product.images[0]} class="small-img" width="90%"/>
                        </a>
                                    </div>
                        <div class="img-item small-img-col">
                        <a href = "#" data-id = "2">
                        <img src={product.images[1]} class="small-img" width="90%"/>
                        </a>
                                    </div>
                        <div class="img-item small-img-col">
                        <a href = "#" data-id = "3">
                        <img src={product.images[2]} class="small-img" width="90%"/>
                        </a>
                                    </div>
                        <div class="img-item small-img-col">
                        <a href = "#" data-id = "4">
                        <img src={product.images[3]} class="small-img" width="90%"/>
                        </a>
                    </div>  
                    
                    
                </div>
             </div>
             <div class="col-2-d pro-info">
                 <p style={{fontSize: '1.5rem'}}>Home / {product.name}</p>
                 <h1>Name: {product.name}</h1>
                                <h4>Price: ${product.price}</h4>
                                <h4><Rating
                                value={product.rating}
                                text={` ${product.numReviews} reviews`}
                                /></h4>
                                {product.colors[0] != null ?
                                    <>
                                        {product.colors[0] != '' ?
                                    <h4 style={{ fontSize: '1.15rem' }}><span>Available Colors:</span>
                                        {product.colors[0] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[0]}` }}></span>}
                                        {product.colors[1] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[1]}` }}></span>}
                                        {product.colors[2] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[2]}` }}></span>}
                                        {product.colors[3] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[3]}` }}></span>}
                                        {product.colors[4] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[4]}` }}></span>}
                                        {product.colors[5] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[5]}` }}></span>}
                                        {product.colors[6] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[6]}` }}></span>}
                                        {product.colors[7] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[7]}` }}></span>}
                                        {product.colors[8] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[8]}` }}></span>}
                                        {product.colors[9] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[9]}` }}></span>}
                                        {product.colors[10] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[10]}` }}></span>}
                                        {product.colors[11] && <span className="dot p-ml-2" style={{ backgroundColor: `${product.colors[11]}` }}></span>}
                                            </h4>
                                            : ''}
                                        </>
                                    : ''}
                                {product.sizes[0] != null ?
                                    <>
                                        {product.sizes[0] != '' ?
                                    
                                            <h4 style={{ fontSize: '1.15rem' }}><span>Available Sizes:</span>
                                                {product.sizes[0] && <span className="p-ml-2">{product.sizes[0]}</span>}
                                                {product.sizes[1] && <span className="p-ml-2">{product.sizes[1]}</span>}
                                                {product.sizes[2] && <span className="p-ml-2">{product.sizes[2]}</span>}
                                                {product.sizes[3] && <span className="p-ml-2">{product.sizes[3]}</span>}
                                                {product.sizes[4] && <span className="p-ml-2">{product.sizes[4]}</span>}
                                                {product.sizes[5] && <span className="p-ml-2">{product.sizes[5]}</span>}
                                                {product.sizes[6] && <span className="p-ml-2">{product.sizes[6]}</span>}
                                                {product.sizes[7] && <span className="p-ml-2">{product.sizes[7]}</span>}
                                                {product.sizes[8] && <span className="p-ml-2">{product.sizes[8]}</span>}
                                                {product.sizes[9] && <span className="p-ml-2">{product.sizes[9]}</span>}
                                                {product.sizes[10] && <span className="p-ml-2">{product.sizes[10]}</span>}
                                                {product.sizes[11] && <span className="p-ml-2">{product.sizes[11]}</span>}
                                            </h4>
                                            : ''}
                                        </>
                                    : ''}
                                <h4>Status: {product.countInStock > 0 ? ' Available' : 'Out of Stock'}</h4>
                 {product.countInStock > 0 && (   
                                <> 
                                    <span className="qty-and-input">
                                    <h4>Qty:</h4>
                                <InputNumber value={qty} style={{ marginRight: "10px", marginLeft: "10px"}} showButtons buttonLayout="horizontal"
                                                             decrementButtonClassName="p-button-danger"
                                                incrementButtonClassName="p-button-success"
                                                 decrementButtonIcon="pi pi-minus"
                                                            incrementButtonIcon="pi pi-plus"
                                                            max={product.countInStock}
                                                            min="1"
                                                            onValueChange={(e) => setQty(e.target.value)} 
                                             
                                            
                                        />
                                        </span>
                                        </>
                                )} 
                               
                 <button  class="btn" disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to cart</button>
                 <h3>Product Details <i class="fa fa-indent"></i></h3>
                 <br/>
                 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
             </div>
         </div> 
     </div>
                    <div className="rev-style">
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
     <div class="small-container">
         <div class="row row-2">
         <h2>Related Products</h2>
         <p>View More</p>
        </div>
     </div>
     <div class="small-container">
                        <div class="product-container ">
                             {products.filter(pro => pro.category.name === product.category.name).map(filteredproduct => (
                        
                            <div class="product-box">
                                
                                         <img alt="apple" src={filteredproduct.image} />
                                    
                                   
                                    <strong>{filteredproduct.name}</strong>
                                    <span class="price">{filteredproduct.price}$</span>
                                    <Link to={`/product/${filteredproduct.id}`} className="add-cart">
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
            )}
            {/* WhatsApp icon */}
      <a
        href="https://wa.me/252617697873"
        class="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa fa-whatsapp whatsapp-icon"></i>
      </a>
            
            </>
                    
    )
}

export default ProductScreen


