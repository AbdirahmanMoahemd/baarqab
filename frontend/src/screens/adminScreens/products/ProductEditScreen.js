import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { listProductDetails, updateProduct } from '../../../actions/productAction.js'
import { PRODUCT_UPDATE_RESET } from '../../../constants/productConstants.js'
import AdminScreen from '../AdminScreen.js'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { listCategories } from '../../../actions/categoryAction'
import { InputSwitch } from 'primereact/inputswitch';
 

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [isFeatured, setisFeatured] = useState(true)
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    let catOptionts

 
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate


    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList
   
    //     categories.map(cat => (
    //          catOptionts = cat.name
    // ))
   
    
    
    useEffect(() => {
        
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        }
        else {
          if (!product.name || product.id !== productId) {
              dispatch(listProductDetails(productId))
               
              dispatch(listCategories())
              
        }
        else {
            setName(product.name)
            setImage(product.image)
            setDescription(product.description)
            setBrand(product.brand)
            setCategory(product.category)
            setPrice(product.price)
            setCountInStock(product.countInStock)
            setisFeatured(product.isFeatured)
        }  
         }
        
    }, [dispatch, history , productId, product, successUpdate ]) 

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e)  => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            image,
            description,
            brand,
            category,
            price,
            countInStock,
            isFeatured
        }))
    }
    const leftContents = (
    <React.Fragment>
            <div >
            <Button 
            label='update'
            className="p-button-primary p-mr-2"
                    icon="pi pi-plus"
            type="submit"
            ></Button>
            <Button 
            label="Cancle"
            className="p-button-secondary"
            icon="pi pi-arrow-circle-left"
            ></Button>
          </div> 
    </React.Fragment>
);
    return (
        <>
           return (
        <>
            <AdminScreen />
                <div className="main-content userlists">
                     <main>
                <Card title="Products" subTitle="You can edit products here">
                          <form onSubmit={submitHandler}>
                          <div className="p-grid mb-5">
                                <div class="p-col-12">
                                      <Toolbar left={leftContents}/>
                                </div>
                         </div>
                        <div class="p-grid" > 
                                 <div class="p-col-12">
                                     {loadingUpdate && <Loader />}
                                    {errorUpdate && <Message>{errorUpdate}</Message>}
                                     {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                                         <div class="p-fluid p-formgrid p-grid" >
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Name</label><br />
                                                 <input value={name} id="name" type="text" style={{width: "80%", height: "30px"}}
                                                 className="p-mt-2"    onChange={(e) => setName(e.target.value)} />
                                             </div>
                                                <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="icon">Category</label><br />
                                                    <select name="" value={category} required style={{ height: "30px", borderRadius:"3%", width: "80%"}}
                                                        onChange={(e) => setCategory(e.target.value)} className="p-mt-2" >
                                                        {categories.map(cat => (
                                                            <>
                                                             <option value={cat.id}>{cat.id.substring(1, 1)}{cat.name}</option>
                                                        </>
                                                        ))}
                                                    
                                                    </select>
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                    <label htmlFor="color">Price</label><br />
                                                     <input value={price} id="icon" type="text" style={{width: "80%", height: "30px"}} className="p-mt-2"
                                                     onChange={(e) => setPrice(e.target.value)} />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                    <label htmlFor="color">CountInStock</label><br />
                                                     <input value={countInStock} id="icon" type="text" style={{width: "80%", height: "30px"}} className="p-mt-2"
                                                     onChange={(e) => setCountInStock(e.target.value)} />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                    <label htmlFor="color">Description</label><br />
                                                     <input value={description} id="icon" type="text" style={{width: "80%", height: "30px"}} className="p-mt-2"
                                                     onChange={(e) => setDescription(e.target.value)} />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                    <label htmlFor="color">isFeatured</label><br />
                                                     <InputSwitch checked={isFeatured} className="p-mt-1"   onChange={(e) => setisFeatured(e.value)} />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                    <label htmlFor="color">Select an image:</label><br />
                                                     <input style={{width: "100%"}} value={image} id="icon" type="text" style={{width: "80%", height: "30px"}} className="p-mt-2"
                                                        onChange={(e) => setImage(e.target.value)} />
                                                    
                                                    <input type="file" id="myfile" name="myfile" className="p-mt-2"
                                                        onChange={uploadFileHandler}
                                                        />
                                                    {uploading && <Loader/>}
                                             </div>   
                                         </div>
                                     )}
                                </div>
                     
                            </div>
                            </form>
                            </Card>
                            </main>
            </div> 
        </>
    
        </>
    )
}

export default ProductEditScreen
