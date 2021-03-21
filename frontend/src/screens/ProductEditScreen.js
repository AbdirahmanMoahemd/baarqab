import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProductDetails, updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants.js'
import AdminScreen from './AdminScreen.js'


const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)


 
    const dispatch = useDispatch() 

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        }
        else {
          if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        }
        else {
            setName(product.name)
            setImage(product.image)
            setDescription(product.description)
            setBrand(product.brand)
            setCategory(product.category)
            setType(product.type)
            setPrice(product.price)
            setCountInStock(product.countInStock)
             
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
            type,
            price,
            countInStock

        }))
    }
    return (
        <>
           return (
        <>
            <AdminScreen />
            <div className="main-content userlists">
            
                <div className="form">
                <div className="login-form">
                    <strong>Edit Products</strong>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message>{errorUpdate}</Message>}
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                            <form onSubmit={submitHandler}>
                                <input type="text" value={name} placeholder="name"
                                    name="name" required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input type="text" value={image} placeholder="image url"
                                    name="image" required
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <label for="myfile">Select an image:</label>
                                <input type="file" id="myfile" name="myfile" required
                                    onChange={uploadFileHandler}
                                    />
                                {uploading && <Loader/>}
                                <input type="text" value={description} placeholder="description"
                                    name="description" required
                                    onChange={(e) => setDescription(e.target.value)}
                                    />
                                <input type="text" value={brand} placeholder="brand"
                                    name="brand" required
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                                <select name="" value={category} required
                                    onChange={(e) => setCategory(e.target.value)} >
                                    <option value="Dhar">Dhar</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="herbal">Herbal</option>
                                    <option value="Cosmatics">Cosmatics</option>
                                </select>
                               <select name="" value={type} required
                                    onChange={(e) => setType(e.target.value)} >
                                    {category === 'Electronics' ?( 
                                    
                                    <> <option value="Mobile">Mobile</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Computers">Computers</option>       
                                    
                                    </> 
                                    )        
                                    :category === 'Dhar' ?
                                    <>
                                    (<option value="Rag">Rag</option>
                                    <option value="Dumar">Dumar</option>
                                    <option value="Caruur">Caruur</option>)    
                                    </>
                                    : category === 'Shoes' ?
                                    <>
                                    (<option value="Rag">Rag</option>
                                    <option value="Dumar">Dumar</option>
                                    <option value="Caruur">Caruur</option>)    
                                    </>
                                    :  category === 'Cosmatics' ?                 
                                    <>
                                    <option value="cosmatics">Cosmatics</option>
                                     </>  
                                    :  category === 'herbal' ?              
                                    <>
                                    <option value="herbal">Herbal</option>
                                    </>
                                    :
                                    <option value="alaab">Alaabta Guryaha</option>                        
                                    }    
                                </select>
                                 <input type="number" value={price} placeholder="Enter price"
                                    name="name" required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <input type="number" value={countInStock} placeholder="countInStock"
                                    name="countInStock" required
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />   
                               
                                <button type="submit" value="" >Update</button>
                            </form>
                        )}
                </div>

                
                
                            
                     <p className="wt"> .</p>
                     <p className="wt"> .</p>       
            </div>  
       
            </div> 
        </>
    )  
        </>
    )
}

export default ProductEditScreen
