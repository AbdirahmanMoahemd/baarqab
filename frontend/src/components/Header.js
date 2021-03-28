import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../logo.png';
import $ from 'jquery';
import SearchBox from './SearchBox';



const Header = () => {

    const dispatch  = useDispatch() 
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
 
 
 

    $(window).scroll(function () {
            if($(document).scrollTop() > 25) {
                $('.navigation').addClass('fix-nav'); 
                $('.bar').addClass('togg');
            }
            else{
                $('.navigation').removeClass('fix-nav');
                $('.bar').removeClass('togg');
            }
    });
     const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const qty= cartItems.reduce((acc, item) => acc + item.qty, 0)
    
    return (
         <>
        <input type="checkbox" id="check"/>
    <nav>
        <div className="social-call">
                    <div className="social">
                        
                <a href="https://www.facebook.com/CaawiyeOnlineSouq" target="_blank"><i className="fa fa-facebook-f"></i></a>
                <Link to="/"><i className="fa fa-twitter"></i></Link>
                <Link to="/"><i className="fa fa-youtube"></i></Link>
                <Link to="/"><i className="fa fa-instagram"></i></Link>
            </div>
            <div className="phone">
                <span>Call +252 615 249030</span>
            </div>
        </div>
        <div className="navigation">
            
                <Link to="/" className="logo">
                        <img src={logo}/>
                    <p>CAAWIYE <span className="souq">SOUQ</span></p>
                </Link>
            
            <Route render={({ history }) => <SearchBox history={history} />}/>  
             <ul className="menu">
                <li><Link to="/">Home</Link></li> 
                <li className="dropdown">   
                    <Link to="/" className="dropbtn">Category <i className="fa fa-caret-down"></i></Link>
                    <div className="dropdown-content">
                        <Link to="/dhar">Dharka</Link>
                        <Link to="/shoes">Kabaha</Link> 
                        <Link to="/electronics">Electronics</Link>
                        <Link to="/Alaabta_Guryaha">Alaabta Guryaha</Link>
                                <Link to="/cosmetics">Cosmetics</Link>
                                <Link to="/herbal">Medical Products</Link>
                    </div>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                        </li>
                        {userInfo && userInfo.isAdmin && (
                            <li>
                                <Link to="/admin">dashboard</Link>
                            </li>
                        )}
               
                
            </ul>
                
                <div className="right-menu">
                        {userInfo ? (
                            <Link to='/profile' ><p>{userInfo.name.split(' ')[0]}</p></Link>
                        ) :  <Link to="/login" className="user">
                    <span className="loginSignUp ">Log In<span className="hideSignUp">/Sign Up</span></span>
                </Link>} 
                 
                <Link to="/cart"> 
                    <i className="fas fa-shopping-cart">
                                <span className="num-cart-product">
                                    {qty}
                                </span>
                    </i>
                </Link>
                    </div>
                  
            <label className="bar" htmlFor="check" >
                <span className="fa fa-bars" id="bars"></span>
                <span className="fa fa-times" id="times"></span>
                        </label>
                       
        </div>
    </nav>
        </>
    )
}

export default Header
