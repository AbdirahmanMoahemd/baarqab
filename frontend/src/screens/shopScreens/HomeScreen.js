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
import { listCategories } from '../../actions/categoryAction' 
import { listSubCategories } from '../../actions/subcategoryActions' 



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
    


    const categoryList = useSelector(state => state.categoryList) 
    const { loading: loadingcat, error: errorCat, categories } = categoryList

    const subcategoryList = useSelector(state => state.subcategoryList) 
    const { loading: loadingSubCat, error: errorSubCat, subcategories}  = subcategoryList
  
    
  

    useEffect(() => {
      
        dispatch(listProducts2())
        dispatch(listCategories())
        dispatch(listSubCategories())
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
                {loadingcat && Loader}
                {errorCat && <Message variant='danger'>{errorCat}</Message>}
                
                <div class="category-container" >
                    {categories &&
                        categories.map(category => (
                        <span key={category.id}>
                            <a href="#" class="category-box">
                                <Link to={`/products`}><img alt="Fish" src={category.icon} /></Link>
                                <span>{category.name}</span>
                            </a>
                            </span>
                            ))}
                        </div>
                    
        </section>
        <section id="popular-product">
        <div class="product-heading">
            <h3>Popular Product</h3>
            <span>All</span>
        </div>
        <div class="product-container">
                    {loading ? (<Loader />) : error ? (<Message variant='danger' > {error}</Message>) : (
                        <>
                        {
                            products.map(product => (
                                <div class="product-box">
                                    <Link to={`/product/${product.id}`} className="add-cart">
                                        <img alt={product.name} src={product.image} />
                                    </Link>
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
                            </>
                       )}
            
        </div>
        </section>
            {loading ? (<Loader />) : error ? (<Message variant='danger' > {error}</Message>) : (
                <>
            {loadingcat && Loader}
            {categories &&
                categories.map(category => (
                    <div className="rev-style-2">
                        <div class="product-heading-package">
                            <h3>{category.name} Package</h3>
                        </div>
                        {loadingSubCat ? (<Loader />) : errorSubCat ? (<Message variant='danger' > {errorSubCat}</Message>) : (
                            <>
                        <TabView activeIndex={activeIndex} scrollable onTabChange={(e) => setActiveIndex(e.index)}>
                            
                            {subcategories &&
                            subcategories.filter(subcat => subcat.category.name === category.name).map(subcategory => (
                                <TabPanel header={subcategory.name}>
                                    <div className="in-header-tab-1">
                                            <>
                                                {products.map(product => (
                                                    <div class="product-box">
                                                        <Link to={`/product/${product.id}`}>
                                                                <img src={product.image} />
                                                        </Link>
                                                        <strong>{product.name}</strong>
                                                        <span class="quantity">{product.description}</span>
                                                        <span class="price">{product.price}$</span>
                                                        <Link to={`/product/${product.id}` } class="cart-btn">
                                                            <i class="fas fa-shopping-bag"></i> Add Cart
                                                        </Link>
                                                        <a href="#" class="like-btn">
                                                            <i class="far fa-heart"></i>
                                                        </a>
                                                    </div>
                                                ))}
                                                </>
                                       
                                            
                                        </div>
                                    </TabPanel>
                            ))}
                               
                            </TabView>
                             </>
                            )}
                    </div>
                    ))} 
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
        <Footer />
      </>
    );
}
  


export default HomeScreen
