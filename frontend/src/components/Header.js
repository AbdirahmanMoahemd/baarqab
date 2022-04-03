import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../images/baarqab.png';
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
         <header class="header">
    <div class="social-call">
        <div class="social-out">
            <div class="social">
                            <a href="#"><i  className="lab la-facebook-f"></i></a>
                <a href="#"><i  class="lab la-twitter"></i></a>
                <a href="#"><i  class="lab la-youtube"></i></a>
                <a href="#"><i  class="lab la-instagram"></i></a>
            </div>
            <div class="phone">
                <span>Call +252 610 872270</span>
            </div>
        </div>
    <Route render={({ history }) => <SearchBox history={history} />}/>  
    </div>
    <div class="in-header">
       <a href="#" class="logo"><img src={logo} routerLink="/"/> </a>
        <input type="checkbox" class="menu-btn" id="menu-btn"/>
        <label for="menu-btn" class="menu-icon">
            <span class="nav-icon"></span>     
        </label>
    
        <ul class="menu">
            <Link to='/'> <li><a class="active">Home</a></li></Link>
            <Link to='/products'><li><a>Products </a></li></Link>
            <Link to='/about'><li><a >About Us</a></li></Link>
            {userInfo && userInfo.isAdmin && (
                <Link to='/admin'><li><a >dashboard</a></li></Link>
            )}
        </ul>

                    <div class="icons">
                        <Link to="/cart" >
                        <div style={{ fontSize: "1.8rem" }} class="pi pi-shopping-cart" id="login-btn">
                            <span className="num-cart-product">
                                    {qty}      
                                </span>
                        </div>
                        </Link>
                        {userInfo ? (
                            <Link to='/profile' >
                    <div style={{ fontSize: "0.8rem"  }} id="login-btn">
                                <p>{userInfo.name.substring(0,5)}-</p>
                           </div> 
                            </Link>
                        ) :  <Link to="/login" className="user">
                     <div style={{ fontSize: "1.8rem" }} class="pi pi-user" id="login-btn"></div>
                </Link>}
    </div>
    </div>
</header>
        </>
    )
}

export default Header
