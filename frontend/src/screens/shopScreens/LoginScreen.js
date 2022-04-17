import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../../components/Loader.js'
import Message from '../../components/Message.js'
import { login } from '../../actions/userActions'
import whatsApplink from '../../common/whatsApplink'

import Header from "../../common/header/Header"

import '../../css/login.css';


const LoginScreen = ( { location, history } ) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 

    const dispatch = useDispatch() 

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect]) 

    const submitHandler = (e)  => {
        e.preventDefault()
        // // DISPACTH LOGIN
        dispatch(login(email, password))
    }
    

    
    

    return (
        <>
            <Header />
            <div className="login-page">
                
                <div className="login-page-mt">
            <div className="form">
                <div className="login-form">
                   
                    <strong>Login</strong>
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader/>}
                    <form onSubmit={submitHandler}>
                        <input type="email" value={email} placeholder="Exmaple@gmail.com"
                            name="email" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="password" value={password}
                            placeholder="password" name="password" required
                            onChange={(e)=> setPassword(e.target.value)}    
                        />
                        <button type="submit" value="" >Login</button>
                    </form> 
                    <div className="form-btns"> 
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="sign-up-btn">New Customer? Register</Link>
                    </div>
                </div>
 
                            
                     <p className="wt"> .</p>
                     <p className="wt"> .</p>       
                    </div>
                    </div>
                </div>
        </>

    )
}

export default LoginScreen
