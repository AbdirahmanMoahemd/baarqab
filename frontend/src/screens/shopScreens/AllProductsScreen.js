import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../css/products.css'
import { Checkbox } from 'primereact/checkbox';
import pimg1 from '../../images/imgae/apple.png';
import pimg2 from '../../images/imgae/chili.png';
import pimg3 from '../../images/imgae/onion.png';
import pimg4 from '../../images/imgae/patato.png';
import pimg5 from '../../images/imgae/garlic.png';
import pimg6 from '../../images/imgae/tamato.png';
import { listProducts2 } from '../../actions/productAction'
import { listCategories } from '../../actions/categoryAction'

const AllProductsScreen = ({ match }) => {
    
    const keyword = match.params.keyword
   const [cities, setCities] = useState([]);


    const [productType, setProductType] = useState('All')

    const dispatch = useDispatch()
    

    const categoryList = useSelector(state => state.categoryList) 
    const {categories}  = categoryList
//     cities = categories

//     const onCityChange = (e) => {
//     const selectedCities = [...cities];
//     if(e.checked)
//         selectedCities.push(e.value);
//     else
//         selectedCities.splice(selectedCities.indexOf(e.value), 1);

//     setCities(selectedCities);
// }

    const productList = useSelector(state => state.productList) 
    const { loading, error, products} = productList
    
    useEffect(() => {
     dispatch(listCategories())
     dispatch(listProducts2())
     
    }, [dispatch])
    return (
       <>
         <Header/>
          <div className="all-products-page">
             <div className="all-products-page-con">
                <div className="containter-pro-1">
                   <div className="containter-pro-1-title"><h3>Category</h3></div>
                   <div className="containter-pro-1-body">
                        <div className="p-grid  p-mt-4 p-mb-5">
                                {categories.map(category => (
                                    <div className="p-col-12 ">
                                        {/* <Checkbox inputId={category.id} className="p-ml-4" value={category.name} onChange={onCityChange} ></Checkbox>
                                        <label htmlFor={category.id} className="p-checkbox-label p-ml-2 ">{category.name}</label> */}
                            
                                    </div>
                                ))} 
                      </div>
                   </div>
                </div> 
                <div className="containter-pro-2">
                   <h3>Products</h3>
                        <div class="product-container">
                            {products.map(product => (
                                <div class="product-box">
                                
                                         <img alt="apple" src={product.image} />
                                    
                                   
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
                </div>
             </div>
          </div>
          <Footer/>
           </>
                    
    )
}

export default AllProductsScreen
