import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Meta from '../components/Meta'
import { listSlides } from '../actions/slideActions'
import Product from '../components/Product'
import Footer from "../components/Footer";
import { listProducts, listTopProducts } from '../actions/productAction'
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Paginate from "../components/Paginate";
import Testimonials from "../components/Testimonials";
import { listPromotions } from "../actions/promotionActions";

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    // const productList = useSelector(state => state.productList)
    // const { loading, error, products, page, pages=3 } = productList
    


    const productTop = useSelector(state => state.productTop)
    const { loading, error, products } = productTop
  
    const slideList = useSelector(state => state.slideList)
    const { loading: loadingslide, error: errorslide, slides } = slideList
  
    const promotionList = useSelector(state => state.promotionList)
    const { loading: loadingpromotion, error: errorpromotion, promotions } = promotionList
    
  

    useEffect(() => {
      // dispatch(listProducts(keyword, pageNumber))
      dispatch(listTopProducts())
      dispatch(listSlides())
      dispatch(listPromotions())
    }, [dispatch, keyword, pageNumber])
  
   

    // const mystyle = {
    //   backgroundImage: {image},
    // }; 
     

    const settings = {
      dots: true,
      infinite: true,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    const settings2 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    return (
        <>
        <Header />
        <Meta/>
       <ul className="slid">
        
            <Slider {...settings}>
            
            {slides.filter(slide => slide.pos === 0).map(slide => (
                <li className="item-a" key={slide._id}>
                  <div className="full-slider-box f-slide-1" style={{backgroundImage: `url(${slide.image})`}}>
                      <div className="slider-text-container"> 
                          <div className="f-slider-text">   
                              <span>{slide.title}</span>
                            <strong>{slide.comment1}<br/><font>{slide.comment2}</font></strong>
                              <a href="#promotion" className="f-slider-btn">Shop Now</a>
                          </div>
                      </div>
                  </div>   
                </li>   
                )) 
                }
             {slides.filter(slide => slide.pos === 1).map(slide => (
                <li className="item-a" key={slide._id}>
                  <div className="full-slider-box f-slide-2" style={{backgroundImage: `url(${slide.image})`}}>
                      <div className="slider-text-container"> 
                          <div className="f-slider-text">   
                              <span>{slide.title}</span>
                            <strong>{slide.comment1}<br/><font>{slide.comment2}</font></strong>
                              <a href="#promotion" className="f-slider-btn">Shop Now</a>
                          </div>
                      </div>
                  </div>   
                </li>   
                )) 
            }
            {slides.filter(slide => slide.pos === 2).map(slide => (
                <li className="item-a" key={slide._id}>
                  <div className="full-slider-box f-slide-2" style={{backgroundImage: `url(${slide.image})`}}>
                      <div className="slider-text-container"> 
                          <div className="f-slider-text">   
                              <span>{slide.title}</span>
                            <strong>{slide.comment1}<br/><font>{slide.comment2}</font></strong>
                              <a href="#promotion" className="f-slider-btn">Shop Now</a>
                          </div>
                      </div> 
                  </div>   
                </li>   
                )) 
                }
            
              
          
        </Slider>
            </ul>
         <section className="section promotion" id="promotion">
    <div className="featured-heading">
        <h2>new Arrival</h2>
          </div>
    {loadingpromotion ? <Loader /> : errorpromotion ? <Message variant='warning'>{errorpromotion}</Message> :
            <>
              
              <div className="promotion-layout container">
                {promotions.map((promotion) => (
                  <div className="promotion-item">
                    <img src={promotion.image} alt="" />
                    <div className="promotion-content">
                      <h3>{promotion.name}</h3> 
                      <Link to={`/search/${promotion.name}`}>SHOP NOW</Link>
                    </div>
                  </div>
                  ))}
                </div>
              
    </>
}
     

        
        
  </section>

          <div className="featured-heading">
        <h2>Top Products</h2>
            </div>  
            
          <div className="prodcut-container">
          {loading ? <Loader /> : error ? <Message variant='warning'>{error}</Message> :
            <>
            {products.map((product) => (
                <div key={product._id} className="product-box">
                  <Product product={product} />
                </div> 
              ))
            }
             </>
            }
                    
            </div>
            
            
            {/* <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} /> */}
            <Testimonials />
            <section className="services">
            
    
        <div className="services-box">
            <i className="fas fa-shipping-fast"></i>
            <span>Fast Shipping</span>
            <p>in 24h</p>
        </div>

        <div className="services-box">
            <i className="fas fa-headphones-alt"></i>
            <span>Support 24/7</span>
            <p>We support 24h a day</p>
        </div> 

        <div className="services-box">
            <i className="fas fa-sync"></i>
            <span>100% Money Back</span>
            <p>You have 30 days to Return</p>
        </div>
    </section>
        <Footer/> 
              
                     
     </>   
    )
}



export default HomeScreen
