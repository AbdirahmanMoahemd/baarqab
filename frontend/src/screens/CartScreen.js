import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Header from '../components/Header'
const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id 

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const testid = location.search ? Number(location.search.split('=')[1]) : 2
    console.log(testid)
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const updateQty = (qty) => {
    const newQty = Number(location.search.split('=')[1]) == qty  
  }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    

    return (
        <>
            <Header/> 
            {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : 
                (
                    <>
                        
                        <div className="small-container cart-page">
                            <span className="cart-top">
                                <p><Link to="/">Home</Link> / <Link to="/cart">cart</Link></p>
                                <strong>Items in Your cart</strong>
                            </span>
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                    {cartItems.map(item => (
                                    <tr key={item.product}>
                                        <td>
                                            <div className="cart-info">
                                                    <img src={item.image}/>
                                                <div>
                                                        <p>{item.name}</p>
                                                        <small>${item.price}</small>
                                                    <br/>
                                                    <Link to="/cart" onClick={() => removeFromCartHandler(item.product)}>Remove</Link>
                                                </div>
                                            </div>
                                        </td>
                                            <td><select value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map(
                                            (x) => ( 
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                    {qty == item.qty} 
                                                    
                                                </option> 
                                            )
                                            )}
                                    </select>  </td>
                                        <td>${(item.price * item.qty).toFixed(2)}</td> 
                                    </tr>  
                                    ))} 
                                    </tbody>
                                </table>
                                <div className="total-price">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>Subtotal</td>
                                            <td>{cartItems.reduce((acc, item) => acc + item.qty, 0)} items</td>
                                        </tr>
                                        
                                        <tr>
                                            <td>Total</td>
                                            <td>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).
                            toFixed(2)
                            }</td>
                                        </tr>
                                        <tr>
                                            <td ><button className="btns ck" style={{width: '70%'}} disabled={cartItems.length === 0}
                                            onClick={checkoutHandler}
                                            >Proceed To Checkout</button></td>
                                            
                                        </tr>
                                        
                                        </tbody> 
                                    </table>
                                      
                            </div>
                            <p className="wt">.</p> 
                            <p className="wt">.</p> 
                            <p className="wt">.</p> 
                            <p className="wt">.</p> 
                            <p className="wt">.</p> 
                            <p className="wt">.</p> 
                             </div>
                        
                    </>       
                )
        
            }
        </>
    )
}

export default CartScreen 
