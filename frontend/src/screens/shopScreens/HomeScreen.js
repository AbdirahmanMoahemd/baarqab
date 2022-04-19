import React, { useRef, useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector , } from 'react-redux'
import Meta from '../../components/Meta'
import Header from "../../common/header/Header"
import Footer from "../../common/footer/Footer"

import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { listProducts2,listNewArravelProducts, listDisProducts } from '../../actions/productAction'
import { listSubCategories } from '../../actions/subcategoryActions' 
import { listCategories } from '../../actions/categoryAction'
import { getProductsByFilter } from '../../actions/filterActions';



import Home from "../../components/MainPage/Home"
import FlashDeals from "../../components/flashDeals/FlashDeals"
import TopCate from "../../components/top/TopCate"
import NewArrivals from "../../components/newarrivals/NewArrivals"
import Discount from "../../components/discount/Discount"
import Shop from "../../components/shops/Shop"
import Annocument from "../../components/annocument/Annocument"
import Wrapper from "../../components/wrapper/Wrapper"
import { listSlides } from '../../actions/slideActions'
import { listPackages } from '../../actions/packageActions'
import { listsettings } from '../../actions/settingsActions'
import { listTopProducts } from '../../actions/productAction'
import WhatsApplink from '../../common/whatsApplink'



const HomeScreen = ({ match , CartItem}) => {

 
    const dispatch = useDispatch()
 
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
  
    const slideList = useSelector((state) => state.slideList)
    const { loading:loadingSlider, error:errorSlider, slides } = slideList

    const producDistList = useSelector(state => state.producDistList)
    const { loading:loadingDis, error:errorDis, products:productsDis } = producDistList
  
    const productArravelList = useSelector(state => state.productArravelList)
    const { loading:loadingProductArravelList, error:errorProductArravelList, products:productsNewArravelList } = productArravelList


    const categoryList = useSelector(state => state.categoryList) 
    const { loading: loadingcat, error: errorCat, categories } = categoryList
  
    const packagesList = useSelector(state => state.packagesList) 
    const { loading: loadingPackage, error: errorPackage, packages } = packagesList

    const subcategoryList = useSelector(state => state.subcategoryList) 
    const { loading: loadingSubCat, error: errorSubCat, subcategories}  = subcategoryList
    
    const settingsList = useSelector(state => state.settingsList) 
    const { loading: loadingSettings, error: errorSettings, settings}  = settingsList
    
    const productTop = useSelector(state => state.productTop)
  const { loading: loadingProductTop, error: errorProductTop, products:productTopList } = productTop  
  

    useEffect(() => { 
      
        dispatch(listProducts2())
        dispatch(listNewArravelProducts())
        dispatch(listDisProducts())
        dispatch(listCategories())
      dispatch(listSubCategories())
      dispatch(listSlides()) 
        dispatch(listPackages())
        dispatch(listsettings())
        dispatch(listTopProducts())
      
      
    }, [dispatch])
  
    
   
  

  
    return (
      <>
        <Header />
        <Meta />
        <Home  Sdata={slides}/>
        <TopCate categories={categories} />
        <NewArrivals productItems={productsNewArravelList} />
        <Discount productItems={productsDis}/>
      <FlashDeals productItems={productTopList} />
      <Shop packages={packages}  /> 
      <Annocument />
      <Wrapper data={settings} />
                 
        {/* WhatsApp icon */}
      <WhatsApplink/>
        <Footer  />
      </>
    );
}
  


export default HomeScreen
