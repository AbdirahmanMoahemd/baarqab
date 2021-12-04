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
        <CheckOutSteps step1 step2 step3/>
          <div className="form">
                <div className="login-form">
                   
                    <strong>Payment Method</strong>
                    <form onSubmit={submitHandler}>
                        <div className='pay'>
                        <label className="payment">Paybal
                            <input type="radio" required name="radio" value='payPal'
                            onChange={(e) =>  setPaymentMethod(e.target.value)}
                            />
                            <span className="checkmark"></span>
                            </label>
                        <span className="dhax">bcj</span>
                        <label className="payment payment2">Evc-Plus
                            <input type="radio" required  name="radio" value='Evc Plus'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="checkmark"></span>
                        </label>
                        </div>
                        <button type="submit">Continue</button>
                    </form>
                    
                </div>
                <p className="wt"> .</p>
                <p className="wt"> .</p>
                <p className="wt"> .</p>
                <p className="wt"> .</p>
                <p className="wt"> .</p>

                
                
                            
                            
            </div>  
            
        </>

    
    )
}

export default PaymentScreen
