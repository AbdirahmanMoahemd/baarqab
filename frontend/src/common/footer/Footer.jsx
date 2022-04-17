import React, { useRef, useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { listsettings } from '../../actions/settingsActions'
import "./style.css"

const Footer = ({  }) => {
    
     const dispatch = useDispatch()

    
    
   
    
    const settingsList = useSelector(state => state.settingsList) 
    const { loading, error, settings } = settingsList

    
    
    useEffect(() => {
        dispatch(listsettings())
       
    }, [ dispatch])
  return (
    <>
      <footer>
        <div class="footer-container">
            <div class="footer-logo">
                <a href="#"><span>Baarqab</span>.shop</a>
                <div class="footer-social">
                     <a target="_blank" href="https://www.facebook.com/Baarqab.RetailCompany/"><i  className="lab la-facebook-f"></i></a>
                <a target="_blank" href="https://www.instagram.com/baarqabonline/"><i  class="lab la-instagram"></i></a>
                </div>
            </div>
        <div class="footer-links">
            <strong>Product</strong>
            <ul>
                <li><a href="#">Clothes</a></li>
                <li><a href="#">Packages</a></li>
                <li><a href="#">Popular</a></li>
                <li><a href="#">New</a></li>
            </ul>
        </div>
        <div class="footer-links">
            <strong>Category</strong>
            <ul>
                <li><a href="#">Beauty</a></li>
                <li><a href="#">Meats</a></li>
                <li><a href="#">Kids</a></li>
                <li><a href="#">Clothes</a></li>
            </ul>
        </div>
        <div class="footer-links">
                      <strong>Contact</strong>
                      {settings.map(setting => (
                          <ul>
                              <li><a href="#">Phone : +{setting.phoneNumber}</a></li>
                <li><a href="#">Email : info.baarqab@gmail.com</a></li>
            </ul>
                      ))}
            
        </div> 
        </div>  
    </footer> 
    </>
  )
}

export default Footer
