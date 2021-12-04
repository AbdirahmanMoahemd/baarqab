import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  getOrderDetails, 
  payOrder, 
  deliverOrder,
  payOrder2
} from '../../actions/orderActions'
import {
  ORDER_PAY_RESET, 
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_RESET2,
} from '../../constants/orderConstants'
import Header from '../../components/Header'


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
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }
  
      
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
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }
  const successPaymentHandler2 = () => {
     dispatch(payOrder2(orderId))
    
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
            <div className="placeorder">
              <div className="box1">
                <span className="order">
                  <strong>Order Id: </strong>
                  <p>{order._id}</p>
                </span>
                <strong>Shipping</strong>
                    
                <span>
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
                <strong>Payment Method</strong>
                <span>
                  <h4>Method:{' '} {' '}
                    {order.paymentMethod}</h4>
                  <h4>{order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                  ) : (
                      <Message variant='danger'>Not Paid</Message>
                    )}</h4>
                </span>
                <strong>Order Items</strong>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                    <div className="small-container cart-page">
                                
                      <table>
                        <tbody>
                          <tr>
                            <th style={{ background: '#e5e5e5', color: '#272727' }}>Product</th>
                            <th style={{ background: '#e5e5e5', color: '#272727' }}>Quantity</th>
                            <th style={{ background: '#e5e5e5', color: '#272727' }}>Total</th>
                          </tr>
                          {order.orderItems.map((item, index) => (
                            <tr key={index}>
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
                  <h4 className='val'>${order.itemsPrice}</h4>
                </span>
                <span>
                  <h4>Shipping:</h4>
                  <h4 className='val'>${order.shippingPrice}</h4>
                </span>
                <span>
                  <h4>Total:</h4>
                  <h4 className='val'>${order.totalPrice}</h4>
                </span>
                {order.paymentMethod === 'payPal' ?
                  <>
                    {!order.isPaid && (
                      <>
                        {loadingPay && <Loader />}
                        {!sdkReady ? (
                          <Loader />
                        ) : (
                            <PayPalButton
                              amount={order.totalPrice}
                              onSuccess={successPaymentHandler}
                            />
                          )}
                      </>
                    )}</> :
                  <>
                    <center><h3>Pay Options</h3> 
                      <div className="payop">
                        <h4>Evc-Plus: 0615249030</h4>
                        <h4>eDahab: 0615249030</h4>
                        <h4>ZAAD: 0615249030</h4>
                      </div>
                      {loadingPay2 && <Loader />}
                      {userInfo && userInfo.isAdmin && !order.isPaid && !order.isDelivered && (
                        <button className="btns" onClick={successPaymentHandler2}
                        >
                          Mark As Paid</button>
                      )}
                    </center>
                  </>
                }
                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (

                  <button className="btns" style={{width: '70%'}} onClick={deliverHandler}
                  >
                    Mark As Delivered</button>
                )}
                {!order.isPaid && (
                  <>
                    {paymentMethod != order.paymentMethod ? <center><h4 style={{ color: 'red' }}>please refresh the page to see the changes you made</h4></center> : ''}
                  </>
                )}
                
              </div>
            </div>
                 
            
            <p className="wt">.</p>
            <p className="wt">.</p>
          </>
        )} </> )
       
}

export default OrderScreen
