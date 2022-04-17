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
import WhatsApplink from '../../common/whatsApplink'

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
    const dispatch = useDispatch()

    
    
   
    
    const settingsList = useSelector(state => state.settingsList) 
    const { loading, error, settings } = settingsList

    
    
    useEffect(() => {
        dispatch(listsettings())
       
    }, [ dispatch])

    return (
        <>
        <Header />
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
         <>
          {settings.map(setting => (
              <div class="section-about">
                <div class="container-about">
                  <div class="content-section-about">
                    <div class="title-about">
                      <h1>About Us</h1>
                    </div>  
             
                    <div class="content-about" >
                      <h3>BAARQAB SOUQ</h3>
                
                      <p>{setting.about}</p>
         
					
				
                    </div>
         
                    <div class="social-about">
                      <a target="_blank" href="https://www.facebook.com/Baarqab.RetailCompany/"><i class="lab la-facebook-f"></i></a>
                      <a target="_blank" href="https://www.instagram.com/baarqabonline/"><i class="lab la-instagram"></i></a>
                    </div>
                  </div>
           
                  <div class="image-section-about">
                    <img src={setting.aboutImg} />
                  </div>
           
           
                </div>
              </div>
          ))}
          </>
          )}
			<WhatsApplink/>
            <Footer/>
        </> 
    )
}

export default AboutUsScreen
