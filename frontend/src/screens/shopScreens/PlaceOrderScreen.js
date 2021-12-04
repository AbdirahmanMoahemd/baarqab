import React, { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import CheckOutSteps from '../../components/CheckOutSteps'
import { createOrder } from  '../../actions/orderActions' 
import { CART_SAVE_PAYMENT_METHOD, CART_SAVE_PAYMENT_METHOD_RESET } from '../../constants/cartConstants'
import { ORDER_DETAILS_REQUEST, ORDER_DETAILS_RESET, ORDER_DETAILS_SUCCESS } from '../../constants/orderConstants'
import Header from '../../components/Header'
import nodemailer from 'nodemailer'



const PlaceOrderScreen = ({ history }) => {
  const [userAddress, setUserAddress] = useState();
  
    const dispatch = useDispatch() 

   const cart = useSelector((state) => state.cart)
    const { paymentMethod } = cart 
//   if (!cart.shippingAddress.address) {
//     history.push('/shipping')
//   } else if (!cart.paymentMethod) {
//     history.push('/payment')
//   }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(1)
  cart.totalPrice = ( 
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice)
  ).toFixed(2)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {

    if (success) { 
      
      history.push(`/order/${order._id}`)
      
    }
    // eslint-disable-next-line
  }, [history, success])
    var today = new Date(),
    todydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  console.log(todydate)
  
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_dgw7jum', 'order_tem', e.target, 'user_K1BAljcQ97hDw2naKe0Jl')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }
 
  
  const placeOrderHandler = () => {
    if (success) {
       dispatch(
        { type: ORDER_DETAILS_RESET},
      )
      dispatch(
        { type: ORDER_DETAILS_REQUEST},
      )
       dispatch(
        { type: ORDER_DETAILS_SUCCESS},
      ) 
      
    }
    else{
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        date: todydate
      })
       
      )
      } 
     
    
  }
    return ( 
         <>
            <Header />
            <CheckOutSteps step1 step2 step3 step4/>
           
                <div className="placeorder">
                <div className="box1">
                    <strong>Shipping</strong>
                    <span>
                <h4>Address:{' '} {' '}
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.phoneNumber},{' '}
                {cart.shippingAddress.country}</h4>
                       </span> 
                  <strong>Payment Method</strong>
                    <span>
                <h4>Method:{' '} {' '}
                {paymentMethod}</h4> 
                    </span>    
                    <strong>Order Items</strong> 
                    {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ) : (
                            <div className="small-container cart-page">
                                
                  <table> 
                    <tbody>
                                        <tr>
                                            <th style={{background: '#e5e5e5', color: '#272727'}}>Product</th>
                                            <th style={{background: '#e5e5e5', color: '#272727'}}>Quantity</th>
                                            <th style={{background: '#e5e5e5', color: '#272727'}}>Total</th> 
                                    </tr>
                                    {cart.cartItems.map((item, index) => ( 
                                        <tr  key={index}>
                                            <td> 
                                                <div className="cart-info">
                                                    <img src={item.image} />
                                                    <p ><Link to={`/product/${item.product}`}>{item.name}</Link></p>
                                                </div>
                                            </td>
                                            <td> {item.qty} x ${item.price}</td>
                                            <td>${item.qty * item.price}</td>
                                        </tr>
                                          ))} 
            
                    </tbody>
                                    </table>
                              
        
                            </div>)}     
             
                </div>
                <div className="box2">
                   <center> <strong>Order Summary</strong></center>
                    <span>
                        <h4>Items:</h4>
                        <h4 className='val'>${cart.itemsPrice}</h4>
                    </span> 
                    <span>
                        <h4>Shipping:</h4>
                        <h4 className='val'>${cart.shippingPrice}</h4>
                    </span> 
                    <span> 
                        <h4>Total:</h4>
                        <h4 className='val'>${cart.totalPrice}</h4>
                    </span>
            {error && <Message variant='danger'>{error}</Message>}
            <form onSubmit={sendEmail}>
              <input className="noNeed" type="text" name="name" value={userInfo.name}/>
                <input className="noNeed" type="number" name="number" value={cart.shippingAddress.phoneNumber}/>
                <center> <button type='submit' style={{ height: '50px'}} className="btns" style={{width: '50%'}} disabled={cart.cartItems === 0}  onClick={placeOrderHandler}>Place Order</button></center>
             </form>
                </div>   
            </div>   
                 
            
          <p className="wt">.</p> 
        <p className="wt">.</p>
        <p className="wt">.</p> 
        <p className="wt">.</p>
        <p className="wt">.</p> 
        </>

    
    )
}

export default PlaceOrderScreen
