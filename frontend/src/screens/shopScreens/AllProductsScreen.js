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


const AllProductsScreen = ({ match }) => {
  const keyword = match.params.keyword
  const [categoryIds, setCategoryIds] = useState([]);
  let updatedCategoryIds;
  

    const dispatch = useDispatch()
    

    const categoryList = useSelector(state => state.categoryList) 
    const { loading: loadingcat, error: errorCat, categories}  = categoryList


    const productList = useSelector(state => state.productList) 
    const { loading, error, products} = productList
    
    useEffect(() => {
     dispatch(listProducts(keyword))
     
    }, [dispatch,keyword ]) 
    useEffect(() => {
      dispatch(listCategories())
     
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
    console.log(updatedCategoryIds)
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
             {errorCat && <Message variant='danger'>{errorCat}</Message>}
            {loadingcat && <Loader/>}
             {error && <Message variant='danger'>{error}</Message>}
            {loading ? ( <Loader /> ) : error ? (<Message variant='danger'>{error}</Message>) : (
          <div className="all-products-page  background">
             <div className="all-products-page-con container">
                <div className="containter-pro-1">
                   <div className="containter-pro-1-title"><h3>Category</h3></div>
                   <div className="containter-pro-1-body">
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
                                             <label class="custom-control-label p-ml-2" for="defaultUnchecked">{category.name}</label>
                                                    </div>
                                                    </div>
                                            ))}
                                    </div>
                      </div>
                   </div>
                </div> 
                <div className="containter-pro-2">
                   <h3>Products</h3>
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
                                    <a href="#" class="like-btn">
                                        <i class="far fa-heart"></i>
                                    </a>
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
