import React from 'react'
import Header from '../components/Header'
import emailjs from 'emailjs-com';
import Message from '../components/Message';


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
            <section className="con-section">
            <div className="con-container">
                <div className="con-contactinfo">
                    <div>
                        <h2>Contact Info</h2>
                        <ul className="con-info">
                            <li>
                                <span><i className="fas fa-map-marker-alt"></i></span>
                                <span>makka al-mukarama 252 Mogadishu, Somalia</span>
                            </li>
                            <li>
                                <span><i className="fas fa-map-marker-alt"></i></span>
                                <span className="c-g txtName" >caawiyesouq@gmail.com</span>
                            </li>
                            <li>
                                <span><i className="fas fa-phone-alt"></i></span>
                                <span>+252 615 249030</span>
                            </li>
                        </ul>
                        
                        </div>
                        <ul className="sci">
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                        </ul>
                </div>
                <div className="contactForm">
                    <h2>Send a Message</h2>
                         <form onSubmit={sendEmail}>
                        <div className="formBox">
                        <div className="inputBox w50">
                            <input type="text" name="fname" required />
                            <span>First Name</span>
                        </div>
                        <div className="inputBox w50">
                            <input type="text" name="lname" required />
                            <span>Last Name</span>
                        </div>
                        <div className="inputBox w50">
                            <input type="text/email" name="email" required />
                            <span>Email Address</span>
                        </div>
                        <div className="inputBox w50">
                            <input type="text" name="number" required />
                            <span>Mobile Number</span>
                        </div>
                        <div className="inputBox w100">
                            <textarea name="comment" required ></textarea>                                
                            <span>Write your message here...</span>
                        </div>
                        <div className="inputBox w100">
                            <input type="submit" value="Send"/>
                                </div>
                            </div>
                            {sent && <Message>Message has been sent!</Message>}
                        </form>
                </div>
                </div>
                </section>
            <p className="wt">.</p> 
            <p className="wt">.</p>
            <p className="wt">.</p>  
            
        </> 
    )
}

export default AboutUsScreen
