import React, { useState, useEffect } from 'react'
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

const CheckoutScreen = ({ match, location, history }) => {



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [apartment, setApartment] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')



     return (
        <>
             <Header />
             <>
                 <div class="checkout-page">
  <div>
    <Button  label="Back to cart" icon="pi pi-arrow-left" ></Button>
  </div>
  <div class="p-grid checkout-form p-mt-4">
    <div class="p-col-12 p-md-12 p-lg-8">
      <form>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-4 ">
            <label for="name">Name</label>
            <InputText style={{fontSize: ".8rem"}} value={name} onChange={(e) => setName(e.value)} id="name"  />
            
          </div>
          <div class="p-field p-col-4 ">
            <label for="email">Email</label>
            <InputText style={{fontSize: ".8rem"}} value={email} onChange={(e) => setEmail(e.value)} id="email"  />
            
          </div>
          <div class="p-field p-col-4">
            <label for="color">Phone</label><br />
            <InputMask  style={{fontSize: ".8rem"}}
              value={phone} onChange={(e) => setPhone(e.value)}
              mask="(999) 999-99999"
            ></InputMask>
            
          </div>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-4">
            <label for="street">Street</label>
            <InputText  style={{fontSize: ".8rem"}}
            value={street} onChange={(e) => setStreet(e.value)} id="street"  />
           
          </div>
          <div class="p-field p-col-4">
            <label for="street">Apartment</label>
            <InputText style={{fontSize: ".8rem"}}
            value={apartment} onChange={(e) => setApartment(e.value)} id="apartment"  />
            
          </div>
          <div class="p-field p-col-4">
            <label for="street">Zip Code</label>
            <InputText  style={{fontSize: ".8rem"}}
            value={zipCode} onChange={(e) => setZipCode(e.value)} id="zip"  />
          </div>
          <div class="p-field p-col-4">
            <label for="city">City</label>
            <InputText  style={{fontSize: ".8rem"}}
            value={city} onChange={(e) => setCity(e.value)} id="city"  />
           
          </div>
          <div class="p-field p-col-4">
            <label for="country">Country</label><br />
            {/* <p-dropdown
              [options]="countries"
              formControlName="country"
              optionLabel="name"
              optionValue="id"
              [filter]="true"
              filterBy="name"
              [showClear]="true"
              placeholder="Select a Country"
            ></p-dropdown> */}
            
          </div>
        </div>
      </form>
    </div>
    <div class="p-col-12 p-md-12 p-lg-4">
     <OrderSummaryScreen/>
      <div class="checkout-button">
         <Button label="Place-Order" ></Button> 
      </div> 
    </div>
  </div>
</div>

            </>
             <Footer/>
        </>
     )
}
export default CheckoutScreen 