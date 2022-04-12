import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import { Button } from 'primereact/button';
import '../../css/cart.css';
import '../../css/order-summary.css';

const OrderSummaryScreen = ({ match, location, history }) => {

    const [urlInclude, seturlInclude] = useState(false)

    if (window.location.href.indexOf("checkout") > -1) {
        seturlInclude(false)
      alert("your url contains the name franky");
    }

    // const productId = match.params.id

    // const qty = location.search ? Number(location.search.split('=')[1]) : 1
    // const testid = location.search ? Number(location.search.split('=')[1]) : 2
   
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    const itemqty = cartItems.reduce((acc, item) => acc + item.qty, 0)

    useEffect(() => {
        // if (productId) {
        //     dispatch(addToCart(productId, qty))
        // }
    }, [dispatch])

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
            
                <div class="order-summary">
                    <h3>Order Summary</h3>
                    <div class="summary-price">
                        <span>Items Quantity</span>
                        <span>{itemqty}</span>
                    </div>
                    <div class="summary-price">
                        <span>Packing & Shipping</span>
                        <span class="free">Agreement<br />(Heshiis)</span>
                    </div>
                    <div class="to-checkout">
                        <div class="summary-price">
                            <span>Total Price</span>
                            <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).
                                toFixed(2)}</span>
                        </div>
                        <div class="checkout-button" >
                            {urlInclude && <Button label="Checkout"
                                disabled={cartItems.length === 0} onClick={checkoutHandler} />
                            }
                        </div>
                    </div>
                </div>
        </>
    )
}

export default OrderSummaryScreen 