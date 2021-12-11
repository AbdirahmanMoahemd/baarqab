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
                <span>Call +252 61 6132192</span>
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
        {/* <input type="checkbox" id="check"/>
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
                    <span className="loginSignUp ">Log In<span  className="hideSignUp">/Sign Up</span></span>
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
    </nav> */}
        </>
    )
}

export default Header
