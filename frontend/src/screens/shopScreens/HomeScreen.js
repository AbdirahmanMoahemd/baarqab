import React, { useRef, useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector , } from 'react-redux'
import Meta from '../../components/Meta'
import Header from "../../common/header/Header"
import Footer from "../../common/footer/Footer"

import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { listProducts2 } from '../../actions/productAction'
import { listSubCategories } from '../../actions/subcategoryActions' 
import { listCategories } from '../../actions/categoryAction'



import Home from "../../components/MainPage/Home"
import FlashDeals from "../../components/flashDeals/FlashDeals"
import TopCate from "../../components/top/TopCate"
import NewArrivals from "../../components/newarrivals/NewArrivals"
import Discount from "../../components/discount/Discount"
import Shop from "../../components/shops/Shop"
import Annocument from "../../components/annocument/Annocument"
import Wrapper from "../../components/wrapper/Wrapper"

const HomeScreen = ({ match , CartItem}) => {
    const keyword = match.params.keyword
   
 
   
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
  
   

  
    return (
      <>
        <Header />
        <Meta />
        <Home CartItem={CartItem} />
      <TopCate />
      <FlashDeals productItems={products} />
      <NewArrivals productItems={products} />
      <Discount productItems={products}/>
      <Shop shopItems={products} /> 
      <Annocument />
      <Wrapper />
                 
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
