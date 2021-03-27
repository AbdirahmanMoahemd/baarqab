import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader  from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProducts2, deleteProduct, createProduct } from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { Link } from 'react-router-dom'
import AdminScreen from './AdminScreen.js'

const ProductListScreen = ({ history }) => {
    // const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList) 
    const { loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete
    
    

    const productCreate = useSelector((state) => state.productCreate)
    const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
    } = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => { 
    dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
        history.push('/login')
        }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
        } 
        else {
        dispatch(listProducts2())
    }
  }, [
    dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this product')) {
            dispatch(deleteProduct(id))
        }
        
    }
    const createProductHandler = () => {
        dispatch(createProduct())
    }
    
    return (
       
             
        <>
            <AdminScreen/>
               <div className="main-content">
           <main>
                   <>
                                <div className="recent-grid testi" >
                                    <div className="projects">
                                        <div className="card">
                                            <div className="card-header">
                                        <h3>Products</h3>
                                                <button className="btn-dash"onClick={createProductHandler} ><i className="fa fa-plus"></i> Create Product</button>
                                            </div>
                                            <div className="card-body">
                            {loadingDelete && <Loader />}
                            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                            {loadingCreate && <Loader />}
                            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                                <div className="table-responsive ">
                                        <table className="table">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>NAME</td>
                                            <td>IMAGE</td>
                                            <td>PRICE</td>
                                            <td>CATEGORY</td>
                                            <td>TYPE</td>        
                                            <td>BRAND</td>
                                            <td></td>
                                            <td></td>
                                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {products.map(product => (
                                            <tr key={product._id}>
                                               <td>{product._id.substring(15, )}</td>
                                               <td>{product.name}</td>
                                               <td> 
                                                <div className="cart-info cart-info-pro">
                                                    <img src={product.image} />
                                                </div>
                                               </td>
                                               <td>${product.price}</td>
                                                <td>{product.category}</td>  
                                                <td>{product.type}</td>  
                                                <td>{product.brand}
                                                </td>
                                                <td>
                                                    <Link to={`/admin/product/${product._id}/edit`}>
                                                        <i className='fa fa-edit'></i>
                                                    </Link>
                                                </td>
                                                 <td>
                                                     <button onClick={() => deleteHandler(product._id)}><i className='fa fa-trash'></i></button>
                                                </td>
                                            </tr>
                                         ))}
                                    </tbody>
                                </table>         
                                </div>
                            )}
                        </div>
                    </div>
                </div> 
               </div>
                    </>
                    </main>
             </div>    
                        
        </>
    
    )
}

export default ProductListScreen





{/*    



*/}