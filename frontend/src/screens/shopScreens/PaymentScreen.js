import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from '../../components/CheckOutSteps'
import { savePaymentMethod } from '../../actions/cartActions'
import Header from '../../components/Header'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

   const [paymentMethod, setPaymentMethod] = useState()

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
    }
    


    return (
        
        <>
         <Header />   
        <div className="login-page-mt">
          <div className="form">
                <div className="login-form">
                   
                    <strong>Payment Method</strong>
                    <form onSubmit={submitHandler}>
                       
                            <div class="custom-control custom-checkbox">
                                <label class="custom-control-label p-mr-2" for="defaultUnchecked">Paypal   </label>
                                <input type="radio" value='payPal' class="custom-control-input" id="defaultUnchecked" name="radio"
                                onChange={(e) =>  setPaymentMethod(e.target.value)}/>
                                             
                            </div>
                            <div class="custom-control custom-checkbox ">
                                <label class="custom-control-label p-mr-2" for="defaultUnchecked">Evc-Plus / ZAAD</label>
                                <input type="radio" value='Evc-Plus' class="custom-control-input" id="defaultUnchecked" name="radio"
                                onChange={(e) =>  setPaymentMethod(e.target.value)}/>
                            </div>
                            
                        <button type="submit">Continue</button>
                    </form>
                    
                </div>
                     
                            
            </div>  
            </div>
        </>

    
    )
}

export default PaymentScreen
