import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../../components/Loader.js'
import Message from '../../components/Message.js'
import Header from "../../common/header/Header"
import Footer from "../../common/footer/Footer"
import '../../css/products.css'
import { listProducts } from '../../actions/productAction'
import { listCategories } from '../../actions/categoryAction' 
import { getProductsByFilter } from '../../actions/filterActions';
import WhatsApplink from '../../common/whatsApplink'
import { listSubCategories } from '../../actions/subcategoryActions'


const AllProductsScreen = ({ match }) => {
  const keyword = match.params.keyword

  const [categoryIds, setCategoryIds] = useState([]);
  const [subcategoryIds, setSubCategoryIds] = useState([]);

  let updatedCategoryIds;
  let updatedSubCategoryIds;
  

    const dispatch = useDispatch()
    

    const categoryList = useSelector(state => state.categoryList) 
    const { loading: loadingcat, error: errorCat, categories}  = categoryList


    const productList = useSelector(state => state.productList) 
    const { loading, error, products } = productList
  
    const subcategoryList = useSelector(state => state.subcategoryList) 
    const {  subcategories } = subcategoryList

    
    useEffect(() => {
     dispatch(listProducts(keyword))
     
    }, [dispatch,keyword ]) 
    useEffect(() => {
      dispatch(listCategories())
     
    }, [dispatch]) 
  useEffect(() => {
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

  const handleCategory2 = e => {
		resetState2();

    const currentSubCategoryChecked = e.target.value;
    
    const allSubCategoriesChecked = [...subcategoryIds];
    
		const indexFound2 = allSubCategoriesChecked.indexOf(currentSubCategoryChecked);

		
		if (indexFound2 === -1) { 
			// add
			updatedSubCategoryIds = [...subcategoryIds, currentSubCategoryChecked];
			setSubCategoryIds(updatedSubCategoryIds);
		} else {
			// remove
			updatedSubCategoryIds = [...subcategoryIds];
			updatedSubCategoryIds.splice(indexFound2, 1);
      setSubCategoryIds(updatedSubCategoryIds);
		}
    dispatch(
      getProductsByFilter({ type: 'subcategory',query2:updatedSubCategoryIds,  }),
		);
  };
  
  const resetState2 = () => {
    
		setSubCategoryIds([]);
	};
  
     
  
    return (
       <>
            <Header />
             {errorCat && <Message variant='danger'>{errorCat}</Message>}
            {loadingcat && <Loader/>}
             {error && <Message variant='danger'>{error}</Message>}
            {loading ? ( <Loader /> ) : error ? (<Message variant='danger'>{error}</Message>) : (
          <div className="all-products-page  background">
             <div className="all-products-page-con container">
                <div className="containter-pro-1">
                   <div className="containter-pro-1-title"><h2>Filter</h2></div>
                <div className="containter-pro-1-body">
                  <br/>
                  <h4>Categories</h4>
                        <div className="p-grid  p-mt-4 p-mb-5">
                                    <div className="p-col-12">
                                            {categories &&
                                            categories.map(category => (
                                            <div key={category.id} >
                                            <div class="custom-control custom-checkbox">
                                                  <input type="checkbox"
                                                    class="custom-control-input"
                                                    name='category'
                                                    value={category.id}
                                                    checked={categoryIds.includes(category.id)}
                                                    onChange={handleCategory}
                                                    id="defaultUnchecked" />
                                             <label class="custom-control-label ml-2" for="defaultUnchecked">{category.name}</label>
                                                    </div> 
                                                    </div>
                                            ))}
                                    </div>
                      </div>
                   </div>
                <div className="containter-pro-1-body">
                  <br/>
                  <h4>Sub Categories</h4>
                        <div className="p-grid  p-mt-4 p-mb-5">
                                    <div className="p-col-12">
                                            {subcategories &&
                                            subcategories.map(subcategory => (
                                            <div key={subcategory.id} >
                                            <div class="custom-control custom-checkbox">
                                                  <input type="checkbox"
                                                    class="custom-control-input"
                                                    name='category'
                                                    value={subcategory.id}
                                                   checked={subcategoryIds.includes(subcategory.id)}
                                                    onChange={handleCategory2}
                                                    id="defaultUnchecked" />
                                             <label class="custom-control-label ml-2" for="defaultUnchecked">{subcategory.name}</label>
                                                    </div>
                                                    </div>
                                            ))}
                                    </div>
                  </div>
                  <br/>
                   </div>
                </div> 
                <div className="containter-pro-2">
                   <h2>Products</h2>
                        <div class="products-container">
                  { products &&
                    products.map(product => (
                                <div class="product-box" key={product.id}>
                                <Link to={`/product/${product.id}`} className="add-cart">
                                         <img alt="apple" src={product.image} />
                                    </Link> 
                                    <Link to={`/product/${product.id}`} className="add-cart">
                                    <strong>{product.name}</strong>
                                    </Link>
                                    <span class="price">{product.price}$</span>
                                    <Link to={`/product/${product.id}`} className="add-cart">
                                        <a href="#" class="cart-btn">
                                        <i class="fas fa-shopping-bag"></i> Add Cart
                                         </a>
                                    </Link>
                                   
                                </div>
                            ))}
        </div>
                </div>
             </div>
          </div>
            )} 
            {/* WhatsApp icon */}
     <WhatsApplink/>
          <Footer/>
           </>
                    
    )
}

export default AllProductsScreen
