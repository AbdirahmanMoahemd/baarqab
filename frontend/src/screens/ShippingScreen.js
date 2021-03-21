import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../components/Loader.js'
import Message from '../components/Message.js'
import CheckoutSteps from '../components/CheckOutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import Header from '../components/Header.js'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
 
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, phoneNumber, country }))
    history.push('/payment') 
  }
    return (
        
        <>
            <Header />
        <CheckoutSteps step1 step2/>
          <div className="form">
                <div className="login-form">
                   
                    <strong>Shipping</strong>
                    <form onSubmit={submitHandler}>
                        <input type="text" value={address} placeholder="Address"
                            name="Address" required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input type="text" value={city} placeholder="City"
                            name="city" required
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input type="number" value={phoneNumber}
                            placeholder="Phone Number" name="phoneNumber" required
                            onChange={(e)=> setPhoneNumber(e.target.value)}    
                        />
                        <input type="text" value={country}
                            placeholder="Country" name="country" required
                            onChange={(e)=> setCountry(e.target.value)}    
                        />
                        <button type="submit">Continue</button>
                    </form>
                    
                </div>
                <p className="wt"> .</p>
                <p className="wt"> .</p>
                <p className="wt"> .</p>

                
                
                            
                            
            </div>  
            
        </>

    )
}

export default ShippingScreen
