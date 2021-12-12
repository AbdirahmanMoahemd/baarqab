import React, { useState, useEffect, useMemo } from 'react'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import Header from '../../components/Header'
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import '../../css/checkout.css';
import pimg1 from '../../images/imgae/apple.png';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import OrderSummaryScreen from './oderSummaryScreen'
import countryList from 'react-select-country-list'
import { Dropdown } from 'primereact/dropdown';
import { updateUserProfile } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import { getUserDetails } from '../../actions/userActions'
import { saveShippingAddress } from '../../actions/cartActions'



const CheckoutScreen = ({  history }) => {



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [apartment, setApartment] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
  
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [cityAddress, setCityAdd] = useState(shippingAddress.cityAddress)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
    const [countryAddress, setCountryAdd] = useState(shippingAddress.countryAddress)
  
  
    const dispatch = useDispatch() 

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector((state) => state.userUpdate)
    const { success } = userUpdate
  
    

  
    useEffect(() => {
         
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
                setPhone(user.phone)
                setPhoneNumber(user.phone)
                setStreet(user.street)
                setApartment(user.apartment)
                setAddress(user.street, user.apartment )
                setCity(user.city)
                setCountry(user.country)
            }
        }
        
    }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    setAddress(street, apartment)
    setPhoneNumber(phone)
    e.preventDefault() 
    
    dispatch(saveShippingAddress({ address, city, phoneNumber, country }))
    history.push('/payment') 
    }

     return (
        <>
             <Header />
             <>
                 <div class="checkout-page"> 
  <div>
    <Link to='/cart' ><Button  label="Back to cart" icon="pi pi-arrow-left" ></Button></Link>
  </div> 
  <div class="p-grid checkout-form p-mt-4">
    <div class="p-col-12 p-md-12 p-lg-8">
      <form>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-4 ">
            <label for="name">Name</label>
            <InputText style={{fontSize: "1rem"}} value={name} onChange={(e) => setName(e.value)} id="name"  />
            
          </div>
          <div class="p-field p-col-4 ">
            <label for="email">Email</label>
            <InputText style={{fontSize: "1rem"}} value={email} onChange={(e) => setEmail(e.value)} id="email"  />
            
          </div>
          <div class="p-field p-col-4">
            <label for="color">Phone</label><br />
            <InputText   style={{fontSize: "1rem"}}
              value={phone} onChange={(e) => setPhone(e.value)}
                         id="phone"
            ></InputText>
            
          </div>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-4">
            <label for="street">Street</label>
            <InputText  style={{fontSize: "1rem"}}
            value={street} onChange={(e) => setStreet(e.value)} id="street"  />
           
          </div>
          <div class="p-field p-col-4">
            <label for="street">Apartment</label>
            <InputText style={{fontSize: "1rem"}}
            value={apartment} onChange={(e) => setApartment(e.value)} id="apartment"  />
            
          </div>
          <div class="p-field p-col-4">
            <label for="city">City</label>
            <InputText  style={{fontSize: "1rem"}}
            value={city} onChange={(e) => setCity(e.value)} id="city"  />
           
          </div>
          <div class="p-field p-col-4">
            <label for="country">Country</label><br />
                       <Dropdown value={country} options={options}
                         filter showClear 
                         onChange={(e) => setCountry(e.value)}
                         placeholder="Select a Country" />
          </div>
        </div> 
      </form>
    </div>
    <div class="p-col-12 p-md-12 p-lg-4">
     <OrderSummaryScreen/>
      <div class="checkout-button">
         <Button label="Continue" onClick={submitHandler}></Button> 
      </div> 
    </div>
  </div>
</div>

         </>
         {/* WhatsApp icon */}
      <a
        href="https://wa.me/252617006139"
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