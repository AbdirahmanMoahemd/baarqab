import React, {useState} from "react"
import logo from "./baarqab.png"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery';
import { Route } from 'react-router-dom'
import SearchBoxxx from "./SearchBoxxx";

const Search = () => { 
  // fixed Header
  $(window).scroll(function () {
            if($(document).scrollTop() > 25) {
                $('.search').addClass('active'); 
                
            }
            else{
                $('.search').removeClass('active');
                
            }
    });

const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
   const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const qty= cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    <>
      <section className= 'search' >
        <div className='container c_flex container-menu'>
          <div className='logo'>
          <Link to='/'>
            <img src={logo} alt=''/>
            </Link>
          </div>
          <Navbar />
           <Route render={({ history }) => <SearchBoxxx history={history} />}/> 
          <div className='icon f_flex '>
            {userInfo ? (
              <Link to='/profile' >
                <span className='user-name'>
                  <p>{userInfo.name.split(' ')[0]}</p>
                  </span>
              </Link> 
                        ) :   <Link to='/login'>
              <i className='fa fa-user icon-circle'></i>
              </Link>}  
            
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{qty}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
