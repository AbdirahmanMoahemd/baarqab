import React, { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import { createOrder } from  '../../actions/orderActions' 
import { CART_SAVE_PAYMENT_METHOD, CART_SAVE_PAYMENT_METHOD_RESET } from '../../constants/cartConstants'
import { ORDER_DETAILS_REQUEST, ORDER_DETAILS_RESET, ORDER_DETAILS_SUCCESS } from '../../constants/orderConstants'

import Header from "../../common/header/Header"
import { Button } from 'primereact/button';
import { RemoveCartFun } from '../../actions/userActions'

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
      dispatch(RemoveCartFun()) 
      } 
     
    
  }

    return ( 
         <>
        <Header />
        <div className="cart-page-new">
          <div class="cart-page">
                            <div class="container-pages-cart">
                           
                                <div class="col-cart">
                                    <div>
                                        {/* <p-button
                                        label="Continue shopping"
                                        icon="pi pi-arrow-left"
                                        ></p-button> */}
                                    </div>
                                <div>
                             </div>
                        
                                        
                <div class="cart-item p-mb-5" >
                                                <div className="shipping-add">
                                                  <strong>Shipping</strong>
                                                    <span className="p-mt-2">
                                                <h4>Address:{' '} {' '}
                                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '},
                                                {cart.shippingAddress.phoneNumber},{' '}
                                                {cart.shippingAddress.country}</h4>
                                                  </span>
                                                <strong className="p-mt-2">Payment Method</strong>
                                                  <span className="p-mt-2">
                                              <h4>Method:{' '} {' '}
                                              {paymentMethod}</h4> 
                                            </span>
                    <strong  className="p-mt-3">Order Items</strong> 
                  </div>
                  {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <>
                      {cart.cartItems.map((item, index) => (
                        <>
                          <div class="p-grid p-fluid p-mt-2 order-box" key={index}>
                            <div class="p-col-4 p-md-4 p-lg-2 cart-item-image">
                              <img style={{ width: "100%", height: "100%" }} src={item.image} />
                            </div>
                            <div class="p-col-8 p-md-4 p-lg-3 ">
                              <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px' }} class=" p-ml-3">name</div>
                              <div style={{ fontSize: '.9rem', fontWeight: '600', marginBottom: '15px' }} class=" p-ml-3">{item.name}</div>
                        
                            </div>
                            <div class="p-col-4 p-md-4 p-lg-3 p-fluid">
                                                        
                              <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px' }} class=" p-ml-3">Quantity</div>
                              <div style={{ fontSize: '.9rem', fontWeight: '600', marginBottom: '15px' }} class=" p-ml-3">{item.qty} x ${item.price}</div>
                            </div>
                            <div class="p-col-8 p-md-4 p-lg-4 p-fluid">
                              <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px' }} class=" p-ml-3">Total:</div>
                              <div style={{ fontSize: '.9rem', fontWeight: '600', marginBottom: '15px' }} class=" p-ml-3">${item.qty * item.price}</div>
                            </div>
                          </div>
                        </>
                      ))}
                    </>)}
                                            </div>
                                     
    </div>
    <div class="co">
                <div class="order-summary">
                     <center> <strong>Order Summary</strong></center>
                    <div class="summary-price">
                        <span>Items</span>
                         <span>${cart.itemsPrice}</span>
                    </div>
                    <div class="summary-price"> 
                        <span>Packing & Shipping</span>
                        <span class="free">${cart.shippingPrice}</span>
                    </div>
                    <div class="to-checkout">
                        <div class="summary-price">
                            <span>Total Price</span>
                            <span>${cart.totalPrice}</span>
                    </div>
                    {error && <Message variant='danger'>{error}</Message>}
                        <div class="checkout-button" >
                            <Button label="Place-Order"  disabled={cart.cartItems === 0}  onClick={placeOrderHandler} />
                        </div>
                    </div>
                </div>
           
    </div>
                                       
            </div> 
            <br/>
            <br/>
            <br/>
            <br/>
           
  
</div>
 
        </div>
           </>
    )
}

export default PlaceOrderScreen

