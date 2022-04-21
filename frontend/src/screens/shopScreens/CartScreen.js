import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import Header from "../../common/header/Header"
import Footer from "../../common/footer/Footer"
import { Message } from 'primereact/message';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import '../../css/cart.css';
import WhatsApplink from '../../common/whatsApplink'
import '../../css/order-summary.css';

const CartScreen = ({ match, location, history }) => {



    const productId = match.params.id 

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const testid = location.search ? Number(location.search.split('=')[1]) : 2
    console.log(testid)
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    const itemqty= cartItems.reduce((acc, item) => acc + item.qty, 0)

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
        history.push('/login?redirect=chechout')
    }
    

    return (
        <>
            <Header />
            <div className="cart-page-new">
            {cartItems.length === 0 ? <span className="empty-massage"><Message severity="info" text="Your cart is empty"></Message><span style={{marginTop: "8px", textDecoration: "underline"}}><Link to='/'>Go Back</Link></span></span> : 
                (
                    <>
                        
                       
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
                                <h4>My Cart: {itemqty} Item(s)</h4>
                             </div>
                        <div class="cart-shipping mb-5">
                                     
                                        </div>
                                        {cartItems.map(item => (
                                            <div class="cart-item mb-5" key={item.product}>
                                                <div class="grid fluid">
                                                    <div class="p-col-6 p-md-4 p-lg-2 cart-item-image">
                                                        <img style={{ width: "100%", height: "100%" }} className="mt-4" src={item.image} />
                                                    </div>
                                                    <div class="col-6 md-4 lg-6 ">
                                                        <div class="cart-item-name ml-3">{item.name}</div>
                                                        <div class="cart-item-price ml-3">${item.newPrice > 0 ? item.newPrice : item.price}</div>
                                                        <div class="cart-item-remove ml-3">
                                                            <Button icon="pi pi-trash "  onClick={() => removeFromCartHandler(item.product)}/>
                                                         </div>
                                                    </div>
                                                     <div class="p-col-12 p-md-4 p-lg-4 p-fluid">
                                                        <div class="p-field cart-item-quantity " >
                                                            <InputNumber value={item.qty} style={{ marginRight: "10px" }} showButtons buttonLayout="horizontal"
                                                                decrementButtonClassName="p-button-danger"
                                                                incrementButtonClassName="p-button-success"
                                                                incrementButtonIcon="pi pi-plus"
                                                                decrementButtonIcon="pi pi-minus"
                                                                max={item.countInStock}
                                                                min="1"
                                                                onValueChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} 
                                                            />

                                                        </div>
                                                        <div class="cart-item-subtotal">
                                                            Subtotal: 
                                                            <span class="cart-item-subtotal-value"> ${item.newPrice > 0 ? (item.qty * item.newPrice).
                                                                toFixed(2)  :(item.qty * item.price).
                                                                toFixed(2)}
                                                            </span>
                                                        </div> 
                                                    </div>
                                                </div>
                                    
                                            </div>
                                        ))}   
    </div>
    <div class="co">
                <div class="order-summary">
                    <h3>Cart Summary</h3>
                    <div class="summary-price">
                        <span>Items</span>
                                                <span>{itemqty}</span>
                    </div>
                    <div class="summary-price"> 
                        <span>Packing & Shipping</span>
                        <span class="free">Agreement<br />(Heshiis)</span>
                    </div>
                    <div class="to-checkout">
                        <div class="summary-price">
                            <span>Total Price</span>
                            <span>${cartItems.reduce((acc, item) => item.newPrice > 0 ? (acc + item.qty * item.newPrice): (acc + item.qty * item.price), 0).
                                toFixed(2)}</span>
                        </div>
                        <div class="checkout-button" >
                            <Button label="Checkout" disabled={cartItems.length === 0} onClick={checkoutHandler} />
                            {/* <p-button label="Checkout" (onClick)="navigateToCheckout()"></p-button> */}
                        </div>
                    </div>
                </div>
           
    </div>
                                       
  </div> 
  
</div>
                      
                    </>       
                )
        
                }
            </div>
            {/* WhatsApp icon */}
      <WhatsApplink/>
            <Footer/>
        </> 
    )
}

export default CartScreen 
