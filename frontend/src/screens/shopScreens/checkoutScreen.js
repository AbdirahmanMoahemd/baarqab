import React, { useState, useEffect, useMemo } from 'react'
import Header from "../../common/header/Header"
import Footer from "../../common/footer/Footer"
import { useDispatch, useSelector } from 'react-redux'
import '../../css/login.css';
import { getUserDetails } from '../../actions/userActions'
import { saveShippingAddress } from '../../actions/cartActions'



const CheckoutScreen = ({  history }) => {


    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
    const [country, setCountry] = useState(shippingAddress.country)
  
  
    const dispatch = useDispatch() 

    

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
  
    

  
    useEffect(() => {
         
        if (!userInfo) {
            history.push('/login')
        }
        else {
            if (!user || !user.name) {
             
                dispatch(getUserDetails('profile'))
            } else {
                if (!shippingAddress.address) {
                    setAddress(user.street, user.apartment)
                    setPhoneNumber(user.phone)
                    setCity(user.city)
                    setCountry(user.country)
                }
            }
                
            }
        
        
    }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault() 
    
    dispatch(saveShippingAddress({ address, city, phoneNumber, country }))
    history.push('/payment') 
    }

     return (
        <>
             <Header />
             <>
                <div className="login-page sh-page">
                
                <div className="login-page-mt">
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
                        <input type="phone" value={phoneNumber}
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
                
     
            </div>  
</div>
</div>

         </>
         {/* WhatsApp icon */}
      <a
        href="https://wa.me/252610872270"
        class="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa fa-whatsapp whatsapp-icon"></i>
      </a>
             <Footer/>
        </>
     )
}
export default CheckoutScreen 