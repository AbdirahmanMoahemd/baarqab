import React from 'react'
import playstore from '../images/play-store.png';
import appstore from '../images/app-store.png';
import { Link } from 'react-router-dom';
import '../css/footer.css';



const Footer = () => {
    return (
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
            <ul>
                <li><a href="#">Phone : +252 610 872270</a></li>
                <li><a href="#">Email : info.baarqab@gmail.com</a></li>
            </ul>
        </div>
        </div>
    </footer>
    )
}

export default Footer
