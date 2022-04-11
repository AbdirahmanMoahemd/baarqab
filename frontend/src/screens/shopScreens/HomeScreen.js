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

const HomeScreen = ({ match , CartItem}) => {
    const keyword = match.params.keyword
  const [categoryIds, setCategoryIds] = useState([]);
  let updatedCategoryIds;
 
   
    const [activeIndex, setActiveIndex] = useState(0);
  

    const dispatch = useDispatch()
 
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const producDistList = useSelector(state => state.producDistList)
    const { loading:loadingDis, error:errorDis, products:productsDis } = producDistList
  
    const productArravelList = useSelector(state => state.productArravelList)
    const { loading:loadingProductArravelList, error:errorProductArravelList, products:productsArravelList } = productArravelList


    const categoryList = useSelector(state => state.categoryList) 
    const { loading: loadingcat, error: errorCat, categories } = categoryList

    const subcategoryList = useSelector(state => state.subcategoryList) 
    const { loading: loadingSubCat, error: errorSubCat, subcategories}  = subcategoryList
  
    

    useEffect(() => { 
      
        dispatch(listProducts2())
        dispatch(listNewArravelProducts())
        dispatch(listDisProducts())
        dispatch(listCategories())
        dispatch(listSubCategories())
    }, [dispatch])
  
    const handleCategory = e => {
		resetState();  

		const currentCategoryChecked = e.target.value;
		const allCategoriesChecked = [...categoryIds];
		const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

		
		if (indexFound === -1) {  
			// add

			updatedCategoryIds = [...categoryIds, currentCategoryChecked];
			setCategoryIds(updatedCategoryIds);
		} else {
			// remove
			updatedCategoryIds = [...categoryIds];
			updatedCategoryIds.splice(indexFound, 1);
      setCategoryIds(updatedCategoryIds);
      
		}
    dispatch(
      getProductsByFilter({ type: 'category', query: updatedCategoryIds }),
		);
  };
   
  const resetState = () => {
    
		setCategoryIds([]);
	};
  

  
    return (
      <>
        <Header />
        <Meta />
        <Home CartItem={CartItem} />
        <TopCate categories={categories} />
        <NewArrivals productItems={productsArravelList} />
        <Discount productItems={productsDis}/>
      <FlashDeals productItems={products} />
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
