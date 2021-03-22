import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating' 
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productAction'
import Products from '../components/Products'
import Header from '../components/Header'


const ElectronicsScreen = ({ match }) => {
    const keyword = match.params.keyword

    const [productType, setProductType] = useState('All')

    const dispatch = useDispatch()
    
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
    
 useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])
    return (
       <>
          <Header/>
            {loading ? <Loader/> : error ? <Message someAlert="someAlert" variant='warning'>{error}</Message> :
            <div className="s">
         <div className="row row-2">
            <h2>Letest Products</h2>
         </div>
            <div  className="prodcut-container">
            
                
                     <> {products.map(product => (
                            <div key={product._id} className="product-box">
                                <Products product={product} />
                            </div>
                         ))}</>
                    
                    </div>
            </div> 
            }
            <p className="wt">.</p> 
          <p className="wt">.</p>  
            
            </>
                    
    )
}

export default ElectronicsScreen
