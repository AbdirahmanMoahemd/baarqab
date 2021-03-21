import React from 'react'
import { Link } from 'react-router-dom'

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="steps">
            <div className="step1">
                { step1 ? (
                    <Link to='/login' className="active">Sign In</Link>) : 
                    <p className="disabled">Sign In</p>
                    }
            </div>
            <div className="step1">
                { step2 ? (
                    <Link to='/shipping' className="active">Shipping</Link>) : 
                    <p className="disabled">Shipping</p>
                    }
            </div>
            <div className="step1">
                { step3 ? (
                    <Link to='/payment' className="active">Payment</Link>) : 
                    <p className="disabled">Payment</p>
                    }
            </div>
            <div className="step1">
                { step4 ? (
                    <Link to='/placeorder' className="active">Place Order</Link>) : 
                    <p className="disabled">Place Order</p>
                    }
            </div>

            
        </div>
    )
}

export default CheckOutSteps
