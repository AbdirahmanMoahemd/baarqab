import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../../components/Loader.js'
import Message from '../../components/Message.js'
import { register } from '../../actions/userActions'

import Header from "../../common/header/Header"


const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [apartment, setApartment] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [message, setMessage] = useState(null)



    const dispatch = useDispatch() 

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect]) 

     const submitHandler = (e)  => {
        e.preventDefault()
        // DISPACTH REGISTER
        if (password !== confirmpassword) {
            setMessage('Passwords do Not Match')
        }
        else {
        dispatch(register(name, email, password, phone, street, apartment, zip, city, country))
             
        }
    }

   
    

    return (
        <>
            <Header />
            <div className="login-page-mt">
            <div className="form">
                <div className="login-form">
                   
                    <strong>Sign Up</strong>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader/>}
                    <form onSubmit={submitHandler}>
                        <input type="name" value={name} placeholder="Name"
                            name="name" required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input type="email" value={email} placeholder="Exmaple@gmail.com"
                            name="email" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="password" value={password}
                            placeholder="password" name="password" required
                            onChange={(e)=> setPassword(e.target.value)}    
                        />
                        <input type="password" value={confirmpassword}
                            placeholder="confirm password" name="confirmpassword" required
                            onChange={(e)=> setConfirmPassword(e.target.value)}    
                        />
                        <input type="name" value={phone} placeholder="phone number"
                            name="name" required
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input type="name" value={street} placeholder="street"
                            name="name" required
                            onChange={(e) => setStreet(e.target.value)}
                        />
                        <input type="name" value={apartment} placeholder="apartment"
                            name="name" required
                            onChange={(e) => setApartment(e.target.value)}
                        />
                        <input type="name" value={zip} placeholder="zip code"
                            name="name" required
                            onChange={(e) => setZip(e.target.value)}
                        />
                        <input type="name" value={city} placeholder="city"
                            name="name" required
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input type="name" value={country} placeholder="country"
                            name="name" required
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <button type="submit">Login</button>
                    </form>
                    <div className="form-btns">
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="sign-up-btn">Have an Account? Login</Link>
                    </div>
                </div>
                <p className="wt"> .</p>
                <p className="wt"> .</p>
                <p className="wt"> .</p>

                
                
                            
                            
                </div>
                </div>
        </>

    )
}

export default RegisterScreen
