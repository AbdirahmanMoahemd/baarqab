import React, { useRef, useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector , } from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Meta from '../../components/Meta'
import { listSlides } from '../../actions/slideActions'
import Product from '../../components/Product'
import Footer from "../../components/Footer";
import Banner from "../../components/banner";
import { listProducts2 } from '../../actions/productAction'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Header from "../../components/Header";
import Paginate from "../../components/Paginate";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import image1 from '../../images/imgae/fish.png';
import image2 from '../../images/imgae/Vegetables.png';
import image3 from '../../images/imgae/medicine.png';
import image4 from '../../images/imgae/baby.png';
import image5 from '../../images/imgae/beauty.png';
import image6 from '../../images/imgae/Gardening.png';
import pimg1 from '../../images/imgae/apple.png';
import pimg2 from '../../images/imgae/chili.png';
import pimg3 from '../../images/imgae/onion.png';
import pimg4 from '../../images/imgae/patato.png';
import pimg5 from '../../images/imgae/garlic.png';
import pimg6 from '../../images/imgae/tamato.png';
import ppimg1 from '../../images/imgae/pack1.png';
import ppimg2 from '../../images/imgae/pack2.jpg';
import ppimg3 from '../../images/imgae/pack3.png';
import ppimg4 from '../../images/imgae/pack1.png';
import ppimg5 from '../../images/imgae/pack2.jpg';
import ppimg6 from '../../images/imgae/pack3.png';
import { TabView, TabPanel } from 'primereact/tabview';

const HomeScreen = ({ match }) => {
  const myToast = useRef(null);
    const keyword = match.params.keyword
 const showToast = (severityValue, summaryValue, detailValue) => {   
    myToast.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});   
  }
 const  showSuccess= () => {
    myToast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
  }
        const [activeIndex, setActiveIndex] = useState(0);
  

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    


    // const productTop = useSelector(state => state.productTop)
    // const { loading, error, products } = productTop
  
    
  

    useEffect(() => {
      
        dispatch(listProducts2())
        
    }, [dispatch])
  
   

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
        <Meta />
        <Banner />
        <section id="category">
        <div class="category-heading">
            <h2>Category</h2>
            <span>All</span>
        </div>
        <div class="category-container">
            <a href="#" class="category-box">
                <img alt="Fish" src={image1}/>
                <span>Fish & Meat</span>
            </a>
            <a href="#" class="category-box">
                <img alt="Fish" src={image2}/>
                <span>Vegatbles</span>
            </a>
            <a href="#" class="category-box">
                <img alt="Fish" src={image3}/>
                <span>Medicine</span>
            </a>
            <a href="#" class="category-box">
                <img alt="Fish" src={image4}/>
                <span>Baby</span>
            </a>
            
            <a href="#" class="category-box">
                <img alt="Fish" src={image5}/>
                <span>Beauty</span>
            </a>
            <a href="#" class="category-box">
                <img alt="Fish" src={image6}/>
                <span>Gardening</span>
            </a>
        </div>
        
        </section>
        <section id="popular-product">
        <div class="product-heading">
            <h3>Popular Product</h3>
            <span>All</span>
        </div>
        <div class="product-container">
            
           {products.map(product => (
                                <div class="product-box">
                                    <img  alt={product.name} src={product.image} />
                                    <strong>{product.name}</strong>
                                    <span class="price">{product.price}$</span>
                                    <Link to={`/product/${product.id}`} className="add-cart">
                                        <a href="#" class="cart-btn">
                                        <i class="fas fa-shopping-bag"></i> Add Cart
                                         </a>
                                    </Link>
                                    <a href="#" class="like-btn">
                                        <i class="far fa-heart"></i>
                                    </a>
                                </div>
                            ))}
            
        </div>
        </section>
        <section id="popular-bundle-pack">
        <div class="product-heading">
            <h3>Men's Package</h3>
        </div>
        
           <TabView activeIndex={activeIndex}  className="tab-view-all"  onTabChange={(e) => setActiveIndex(e.index)}>
             
            <TabPanel header="SHIRTS">
               <div className="in-header-tab-1">
                {products.map(product => (
                                <div class="product-box">
                                    <img  alt={product.name} src={product.image} />
                                    <strong>{product.name}</strong>
                                    <span class="price">{product.price}$</span>
                                    <Link to={`/product/${product.id}`} className="add-cart">
                                        <a href="#" class="cart-btn">
                                        <i class="fas fa-shopping-bag"></i> Add Cart
                                         </a>
                                    </Link>
                                    <a href="#" class="like-btn">
                                        <i class="far fa-heart"></i>
                                    </a>
                                </div>
                            ))}
            
            </div>
          </TabPanel>
          <TabPanel header="SHOES">
               <div className="in-header-tab-1">
               <div class="product-box">
                <img alt="pack" src={ppimg1}/>
                <strong>Big Pack</strong>
                <span class="quantity">Lemone, Tamato, Patato,+4</span>
                <span class="price">9$</span>
                <a href="#" class="cart-btn">
                    <i class="fas fa-shopping-bag"></i> Add Cart
                </a>
                <a href="#" class="like-btn">
                    <i class="far fa-heart"></i>
                </a>
            </div>
            <div class="product-box">
              <img alt="apple" src={ppimg2}/>
                <strong>Large Pack</strong>
                <span class="quantity">Lemone, Tamato, Patato,+2</span>
                <span class="price">5$</span>
                <a href="#" class="cart-btn">
                    <i class="fas fa-shopping-bag"></i> Add Cart
                </a>
                <a href="#" class="like-btn">
                    <i class="far fa-heart"></i>
                </a>
            </div>
            <div class="product-box">
                <img alt="apple" src={ppimg3}/>
                <strong>Small Pack</strong>
                <span class="quantity">Lemone, Tamato, Patato</span>
                <span class="price">3$</span>
                <a href="#" class="cart-btn">
                    <i class="fas fa-shopping-bag"></i> Add Cart
                </a>
                <a href="#" class="like-btn">
                    <i class="far fa-heart"></i>
                </a>
            </div>
            <div class="product-box">
                <img alt="pack" src={ppimg1}/>
                <strong>Big Pack</strong>
                <span class="quantity">Lemone, Tamato, Patato,+4</span>
                <span class="price">9$</span>
                <a href="#" class="cart-btn">
                    <i class="fas fa-shopping-bag"></i> Add Cart
                </a>
                <a href="#" class="like-btn">
                    <i class="far fa-heart"></i>
                </a>
            </div>
            <div class="product-box">
                <img alt="apple"  src={ppimg2}/>
                <strong>Large Pack</strong>
                <span class="quantity">Lemone, Tamato, Patato,+2</span>
                <span class="price">5$</span>
                <a href="#" class="cart-btn">
                    <i class="fas fa-shopping-bag"></i> Add Cart
                </a>
                <a href="#" class="like-btn">
                    <i class="far fa-heart"></i>
                </a>
            </div>
            <div class="product-box">
                <img alt="apple"  src={ppimg3}/>
                <strong>Small Pack</strong>
                <span class="quantity">Lemone, Tamato, Patato</span>
                <span class="price">3$</span>
                <a href="#" class="cart-btn">
                    <i class="fas fa-shopping-bag"></i> Add Cart
                </a>
                <a href="#" class="like-btn">
                    <i class="far fa-heart"></i>
                </a>
            </div>
            </div>
          </TabPanel>
          <TabPanel header="T-SHIRTS">
              <div className="in-header-tab-1">
                 {products.map(product => (
                                <div class="product-box">
                                    <img  alt={product.name} src={product.image} />
                                    <strong>{product.name}</strong>
                                    <span class="price">{product.price}$</span>
                                    <Link to={`/product/${product.id}`} className="add-cart">
                                        <a href="#" class="cart-btn">
                                        <i class="fas fa-shopping-bag"></i> Add Cart
                                         </a>
                                    </Link>
                                    <a href="#" class="like-btn">
                                        <i class="far fa-heart"></i>
                                    </a>
                                </div>
                            ))}
          
            </div>
            </TabPanel>
            
   
      </TabView> 
        
        </section>

      
        <Footer />
      </>
    );
}
  


export default HomeScreen
