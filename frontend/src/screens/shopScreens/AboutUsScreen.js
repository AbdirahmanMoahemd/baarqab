import React, { useRef, useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector , } from 'react-redux'
import Header from "../../common/header/Header"
import Footer from "../../common/footer/Footer"
import emailjs from 'emailjs-com';
import image1 from '../../images/aboutpage.png';
import '../../css/about.css'
import { listsettings } from '../../actions/settingsActions'
import Loader  from '../../components/Loader.js'
import Message from '../../components/Message.js'

const AboutUsScreen = () => {
   const dispatch = useDispatch()
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
  const settingsList = useSelector(state => state.settingsList) 
    const { loading, error, settings } = settingsList
  console.log(settings)

   useEffect(() => { 
      
       
        dispatch(listsettings())
      
      
    }, [dispatch])

    return (
        <>
        <Header />
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
         <>
          {
            settings.map((val, index) => {
              <div class="section-about">
                <div class="container-about">
                  <div class="content-section-about">
                    <div class="title-about">
                      <h1>About Us</h1>
                    </div>
             
                    <div class="content-about" key={index}>
                      <h3>BAARQAB SOUQ</h3>
                
                      <p>{val.about}</p>
         
					
				
                    </div>
         
                    <div class="social-about">
                      <a target="_blank" href="https://www.facebook.com/Baarqab.RetailCompany/"><i class="lab la-facebook-f"></i></a>
                      <a target="_blank" href="https://www.instagram.com/baarqabonline/"><i class="lab la-instagram"></i></a>
                    </div>
                  </div>
           
                  <div class="image-section-about" key={index}>
                    <img src={val.aboutImg} />
                  </div>
           
           
                </div>
              </div>
            })
            }
          </>
          )}
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
