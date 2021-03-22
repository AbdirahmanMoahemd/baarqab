import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts2 } from '../actions/productAction'
import Products from '../components/Products'
import Header from '../components/Header'


const ProductsScreen = ({ match }) => {

   const [productType, setProductType] = useState('All')
   const dispatch = useDispatch() 
    
  const productList2 = useSelector(state => state.productList2)
  const { loading, error, products } = productList2
    
 useEffect(() => {
        dispatch(listProducts2())
 }, [dispatch])
    console.log(productType)
    return (
       <>
          <Header />
            {loading ? <Loader/> : error ? <Message variant='warning'>{error}</Message> :
            <div className="s">
         <div className="row row-2">
            <h2>{productType === 'All' ? 'Dhar' : `Dhar - ${productType}`}</h2>
             <span className="new-col">  
            <h3> Dooro Nuuca Dharka</h3>                
            <select name="" value={productType} 
                  onChange={(e) => setProductType(e.target.value)} >
                            
                 <option value="All">All</option>
                 <option value="Rag">Rag</option>
                 <option value="Dumar">Dumar</option>
                 <option value="Caruur">Caruur</option>
              </select>
              </span> 
                </div>
                
            <div  className="prodcut-container">
           
               {productType === 'All' ? (
                     <> { 
                        products.filter(product => product.category === 'Dhar' ).map(filteredproduct => (
                
                  <div key={filteredproduct._id} className="product-box">
                    <Products product={filteredproduct} />
                    </div>
                         ))}</>) :
                      (
                         <>
                           { 
                        products.filter(product => product.category === 'Dhar' && product.type === productType ).map(filteredproduct2 => (
                  
                        <div key={filteredproduct2._id} className="product-box">
                           <Products product={filteredproduct2} />
                        </div>
                         ))}  
                         </>
                      )
               }  
                    
                   </div>
                   
            </div> 
            } 
            <p className="wt">.</p> 
          <p className="wt">.</p>  
            
            </>
                    
    )
}

export default ProductsScreen
