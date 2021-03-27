import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating' 
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts2 } from '../actions/productAction'
import Products from '../components/Products'
import Header from '../components/Header'
import Meta from '../components/Meta'


const ShoesScreen = () => {

    const [productType, setProductType] = useState('All')

    const dispatch = useDispatch()
    
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
    
 useEffect(() => {
        dispatch(listProducts2())
    }, [dispatch])
     return ( 
        <>
           <Header />
           <Meta/>

            {loading ? <Loader/> : error ? <Message variant='warning'>{error}</Message> :
            <div className="s">
         <div className="row row-2">
            <h2>{productType === 'All' ? 'KABAHA' : `KABAHA - ${productType}`}</h2>
             <span className="new-col">  
            <h3> Dooro Nuuca kabaha</h3>                
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
                        products.filter(product => product.category === 'Shoes').map(filteredproduct => (
                
                  <div key={filteredproduct._id} className="product-box">
                    <Products product={filteredproduct} />
                    </div>
                         ))}</>) :
                      (
                         <>
                           { 
                        products.filter(product => product.category === 'Shoes' && product.type === productType ).map(filteredproduct2 => (
                  
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
             <p className="wt">.</p> 
          <p className="wt">.</p>  
            </>
                    
    )
}

export default ShoesScreen
