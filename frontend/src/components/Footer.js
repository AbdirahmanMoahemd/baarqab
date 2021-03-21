import React from 'react'
import playstore from '../images/play-store.png';
import appstore from '../images/app-store.png';
import { Link } from 'react-router-dom';




const Footer = () => {
    return (
        <div className="footer">
        <div className="container">
            <div className="row">
                <div className="footer-col-1">
                    <h3>Download Our App</h3>
                    <p>Download App For Android And IOS Mobile Phone</p>
                    <div className="app-logo">
                        <img src={playstore} alt=""/>
                        <img src={appstore} alt=""/>
                    </div>
                </div>
                <div className="footer-col-2">
                    <a href="#" className="logo">
                        <p>CAAWIYE <span className="souq">SOUQ</span></p>
                    </a>
                        <p>Caawiye Souq waa suuq si online ah aad uga dukaameysankartid adiga oo jooga gurigaaga, 
                        goobtaada ganacsi iyo meelwaliba sida (alaabta guryaha, dharka, kabaha, alaabada leesku qurxiyo iyo electronicskaba).
                        Waxaa kalood kadalbankartaa alaabtaad doontid ee dibada lagaaga keenayo. </p>
                </div>
                <div className="footer-col-3">
                    <h3>Useful Links</h3>
                    <ul>
                        <li><Link className="useful" to="/">Home</Link></li>
                        <li><Link className="useful" to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-col-4">
                    <h3>Follow Us</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>YouTube</li>
                    </ul>
                </div>
    
    
            </div>
            <hr/>
            <p className="copyright">Copyright 2020 - Caawiye Souq</p>
        </div>
    </div>
    )
}

export default Footer
