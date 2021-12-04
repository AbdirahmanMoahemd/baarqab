import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader  from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { listProducts2, deleteProduct, createProduct } from '../../../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../../../constants/productConstants'
import { Link } from 'react-router-dom'
import AdminScreen from '../AdminScreen.js'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';


const ProductListScreen = ({ history }) => {
    // const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList) 
    const { loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete
    
    


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => { 
    dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
        history.push('/login')
        }

        dispatch(listProducts2())
   
  }, [
    dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this product')) {
            dispatch(deleteProduct(id))
        }
        
    }

        const leftContents = (
    <React.Fragment>
            <div >
                <Link to={'/admin/product/create/new'}>
            <Button 
            label="New"
            className="p-button-success  p-mr-2"
            icon="pi pi-plus"
            ></Button>
                </Link>
            <Button 
            label="Refresh"
            className="p-button-primary"
            icon="pi pi-refresh"
            onClick={() => window.location.reload(false)}
            ></Button>
          </div> 
    </React.Fragment>
);
    
    return (
       
             
        <>
            <AdminScreen/>
               <div className="main-content">
                    <main>
                        <Card title="Products" subTitle="List of all products">
                <div className="p-grid">
                    <div className="p-col-12">
                     <Toolbar left={leftContents}/>
                        
                    </div>
                </div>
                <div className ="p-grid">
                                <div className="p-col-12">
                            {loadingDelete && <Loader />}
                            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                                            <div className="table-responsive " style={{overflowX:"auto"}}>
                                        <table className="table" >
                                    <thead>
                                        <tr>
                                            <td>NAME</td>
                                            <td>IMAGE</td>
                                            <td>PRICE</td>
                                            <td>CATEGORY</td>
                                            <td>BRAND</td>
                                            <td>Stock</td>
                                            <td></td>
                                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {products.map(product => (
                                            <tr key={product.id}>
                                               <td>{product.name}</td>
                                               <td className="product-per-image">
                                                    <img style={{width: "100%"}} src={product.image} />
                                               </td>
                                               <td>${product.price}</td>
                                                <td>{product.category.name}</td>  
                                                <td>{product.brand}</td>
                                               <td>{product.countInStock}</td>
                                                <td>
                                                    <Button 
                                                    icon="pi pi-trash"
                                                    className="p-button-danger p-mr-2"
                                                    onClick={() => deleteHandler(product.id)}
                                                ></Button>
                                             <Link to={`/admin/product/${product.id}`}> 
                                            <Button 
                                            icon="pi pi-pencil"
                                                           className="p-button-success p-mr-2"
                                                           
                                                    ></Button>
                                                 </Link>  
                                                </td>
                                                 
                                            </tr>
                                         ))}
                                    </tbody>
                                </table>         
                                </div>
                            )}
                                 </div>
                </div>
                
               </Card>
                    
                    </main>
             </div>    
                        
        </>
    
    )
}

export default ProductListScreen





{/*    



*/}