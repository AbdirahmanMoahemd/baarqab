import React from 'react'

import Header from "../../common/header/Header"
import Footer from "../../common/footer/Footer"

import emailjs from 'emailjs-com';
import Message from '../../components/Message';
import image1 from '../../images/aboutpage.png';
import '../../css/about.css'


const AboutUsScreen = () => {
    let sent = false
    function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_dgw7jum', 'test_order', e.target, 'user_K1BAljcQ97hDw2naKe0Jl')
      .then((result) => {
          console.log(result.text);
          sent = true
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset()
  }

    return (
        <>
            <Header />
           <div class="section-about">
		<div class="container-about">
			<div class="content-section-about">
				<div class="title-about">
					<h1>About Us</h1>
				</div>
				<div class="content-about">
					<h3>BAARQAB SOUQ</h3>
					<p>Baarqab.shop Wa Suuq Online Ah, oo Ad Ka Iibsan Kartid Alaabta Ad Rabto, Sidoo Kale Ad Ku Iibin Kartid Alabta Ad Rabtid Inaad Iibisid.
Baarqab.com waxay leedahay adeeg Delivery ah oo ka caawin doona in lagu Qaado/Raro alabtaada</p>
					<div class="button-about">
						<a href="">Read More</a>
					</div>
				</div>
				<div class="social-about">
					<a target="_blank" href="https://www.facebook.com/Baarqab.RetailCompany/"><i class="lab la-facebook-f"></i></a>
					<a target="_blank" href="https://www.instagram.com/baarqabonline/"><i class="lab la-instagram"></i></a>
				</div>
			</div>
			<div class="image-section-about">
				<img src={image1}/>
			</div>
		</div>
			</div> 
			{/* WhatsApp icon */}
      <a
        href="https://wa.me/252610872270"
        class="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa fa-whatsapp whatsapp-icon"></i>
      </a>
            <Footer/>
        </> 
    )
}

export default AboutUsScreen
