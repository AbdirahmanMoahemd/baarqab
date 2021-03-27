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


const ElectronicsScreen = () => {

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
          
            {loading ? <Loader/> : error ? <Message someAlert="someAlert" variant='warning'>{error}</Message> :
            <div className="s">
         <div className="row row-2">
            <h2>{productType === 'All' ? 'Electronics' : `Electronics - ${productType}`}</h2>
             <span className="new-col">  
            <h3> Dooro Nuuca Electronics-ka</h3>              
            <select name="" value={productType} 
                  onChange={(e) => setProductType(e.target.value)} >
                            
                 <option value="All">All</option>
                 <option value="Mobile">Mobile</option>
                 <option value="Computers">Computers</option>
                 <option value="Accessories">Accessories</option>
              </select>
              </span> 
         </div>
            <div  className="prodcut-container">
            
                {productType === 'All' ? (
                     <> { 
                        products.filter(product => product.category === 'Electronics').map(filteredproduct => (
                
                  <div key={filteredproduct._id} className="product-box">
                    <Products product={filteredproduct} />
                    </div>
                         ))}</>) :
                      ( 
                         <>
                           { 
                        products.filter(product => product.category === 'Electronics' && product.type === productType ).map(filteredproduct2 => (
                  
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

export default ElectronicsScreen
