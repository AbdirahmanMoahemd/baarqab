import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Button } from 'primereact/button';
import {
  getOrderDetails, 
  payOrder, 
  deliverOrder,
  payOrder2
} from '../../actions/orderActions'
import {
  ORDER_PAY_RESET, 
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET2,
} from '../../constants/orderConstants'

import Header from "../../common/header/Header"


const OrderScreen = ({ history, match }) => {
     const orderId = match.params.id

  const cart = useSelector((state) => state.cart)
    const { paymentMethod } = cart 
  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  
  const orderPay2 = useSelector((state) => state.orderPay2)
  const { loading: loadingPay2, success: successPay2 } = orderPay2

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver  

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => { 
      return (Math.round(num * 100) / 100).toFixed(2)
    } 

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => item.newPrice > 0 ? (acc + item.newPrice * item.qty) :(acc + item.price * item.qty), 0)
    )
  }
  const itemsPri = cart.itemsPrice;
      
  useEffect(() => {
    
    if (!userInfo) {
      history.push('/login')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successPay2 || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_PAY_RESET2 })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) { 
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch,history, orderId, successPay, successDeliver, order, userInfo, successPay2])
  const successPaymentHandler = () => {
    dispatch(payOrder2(orderId))
  }
  
  // var amount  
  // order.orderItems.map((item, index) => (
  //  amount = item.qty * item.price
    
  // ))
  // console.log(amount)
  
   const evcpayment = () => { 
     var data = JSON.stringify({
      "schemaVersion": "1.0",
    "requestId": orderId,
    "timestamp": Date.now(),
    "channelName": "WEB",
    "serviceName": "API_PURCHASE",
    "serviceParams": {
        "merchantUid": "M0910455",
        "apiUserId": "1001052", 
        "apiKey": "API-14003888AHX",
        "paymentMethod": "mwallet_account",
        "payerInfo": {
            "accountNo": order.shippingAddress.phoneNumber
        },
        "transactionInfo": {
            "referenceId": "REF8815718025",
            "invoiceId": "INV8815718025",
            "amount": 0.01,
            "currency": "USD",
            "description": "test direct purchase"
        }
    }
});
var config = {
  method: 'post',
  url: 'https://api.waafipay.net/asm',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
  .then(function (response) {
    if (response.data.responseCode == 5206) {
    window.alert("not sent yet");
    }
    if (response.data.responseCode == 2001) {
      window.alert("Paid successfully");
      dispatch(payOrder2(orderId))
    }
  console.log(JSON.stringify(response.data.responseCode));
})
.catch(function (error) {
  console.log(error);
});

  }
  
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  return (
    <>
      <Header />
      
      {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
        (
          <>
           <div className="cart-page-new">
          <div class="place-page">
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
                                                <h4>name:{' '}{order.user.name}</h4>
                   <h4>Email:{' '}<a href={`mailto:${order.user.email}`}>{order.user.email}</a></h4>
                   <h4>Address:{' '} {' '}
                     {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                     {order.shippingAddress.phoneNumber},{' '}
                     {order.shippingAddress.country}</h4>
                   <h4>{order.isDelivered ? (
                     <Message variant='success'>
                       Delivered on {order.deliveredAt}
                     </Message>
                   ) : (
                       <Message variant='danger'>Not Delivered</Message>
                     )}</h4>
                                                  </span>
                                                <strong className="p-mt-2">Payment Method</strong>
                                                  <span className="p-mt-2">
                                                    <h4>Method:{' '} {' '}
                                                      {order.paymentMethod}</h4>
                                                    <h4>{order.isPaid ? (
                                                      <Message variant='success'>Paid on {order.paidAt}</Message>
                                                    ) : (
                                                        <Message variant='danger'>Not Paid</Message>
                                                      )}</h4>
                                            </span>
                    <strong  className="p-mt-3">Order Items</strong> 
                  </div>
                  {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <>
                      {order.orderItems.map((item, index) => (
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
                              <div style={{ fontSize: '.9rem', fontWeight: '600', marginBottom: '15px' }} class=" p-ml-3">{item.qty} x {itemsPri}</div>
                            </div>
                            <div class="p-col-8 p-md-4 p-lg-4 p-fluid">
                              <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px' }} class=" p-ml-3">Total:</div>
                              <div style={{ fontSize: '.9rem', fontWeight: '600', marginBottom: '15px' }} class=" p-ml-3">${itemsPri}</div>
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
                         <span>${itemsPri}</span>
                    </div>
                    <div class="summary-price"> 
                        <span>Packing & Shipping</span>
                        <span class="free">${order.shippingPrice}</span>
                    </div>
                    <div class="to-checkout">
                        <div class="summary-price">
                            <span>Total Price</span>
                            <span>${order.totalPrice}</span>
                        </div>
                     {order.paymentMethod === 'cash' ?
                  <>
                            {!order.isPaid && (
                              <>
                              <p style={{color: 'blue'}}>Thanks so much for your order! </p>
                              <p style={{color: 'blue'}}>
                        we will contact you as soon as possible
                                </p>
                                 {userInfo && userInfo.isAdmin && !order.isPaid && !order.isDelivered && (
                                <>
                                   <div class="checkout-button" >
                            <Button label="Mark as paid"   onClick={successPaymentHandler}  />
                        </div>
                                  </>
                     ) }
                                </>
                    )}</> :
                          <>
                    
                            <center>
                             
                      {loadingPay2 && <Loader />}
                              {userInfo  && !order.isPaid && !order.isDelivered && (
                                <div class="checkout-button" >
                            <Button label="Pay / BIXI"   onClick={evcpayment}  />
                        </div>
                      )}
                    </center>
                  </>
                }
                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                 <div class="checkout-button" >
                          <Button label=" Mark As Delivered" onClick={deliverHandler} />
                </div>
                )}
                {!order.isPaid && (
                  <>
                    {paymentMethod != order.paymentMethod ? <center><h4 style={{ color: 'red' }}>please refresh the page to see the changes you made</h4></center> : ''}
                  </>
                )}
                
                    {error && <Message variant='danger'>{error}</Message>}
                        
                    </div>
                </div>
           
    </div>
                                       
  </div> 
  
</div>
 
        </div>
          </>
        )} </> )
       
}

export default OrderScreen
