import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { listProductDetails, updateProduct, createProduct } from '../../../actions/productAction.js'
import AdminScreen from '../AdminScreen.js'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
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

 
    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate,success: successCreate, } = productCreate


    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

   const submitHandler = (e) => {
           
         e.preventDefault() 
       dispatch(createProduct(name, category, brand, description,
       price, countInStock, isFeatured, image))
        }
   
    
    useEffect(() => {
        dispatch(listCategories())
       if (successCreate) { 
           history.push('/admin/productlist') 
        }
        
        
    }, [dispatch, history ,  successCreate ]) 

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

    
    const leftContents = (
    <React.Fragment>
            <div >
            <Button 
            label='Create'
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
          
            <AdminScreen />
                <div className="main-content userlists">
                     <main>
                <Card title="Products" subTitle="You can add products here">
                          <form onSubmit={submitHandler}>
                          <div className="p-grid mb-5">
                                <div class="p-col-12">
                                      <Toolbar left={leftContents}/>
                                </div>
                         </div>
                        <div class="p-grid" > 
                                 <div class="p-col-12">
                                     
                                    {loadingCreate && <Loader />}
                                     {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                                         <div class="p-fluid p-formgrid p-grid" >
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                 <label htmlFor="name">Name</label><br />
                                                 <input value={name} id="name" type="text" className="p-mt-1" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setName(e.target.value)} />
                                             </div>
                                                <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="icon">Category</label><br />
                                                    <select name="" value={category} required style={{ height: "30px", borderRadius:"0%", width: "80%", fontSize: ".8rem"}}
                                                        onChange={(e) => setCategory(e.target.value)} >
                                                        {categories.map(cat => (
                                                            <>
                                                             <option value={cat.id}>{cat.id.substring(1, 1)}{cat.name}</option>
                                                            </>
                                                        ))}
                                                    
                                                    </select>
                                            </div>
                                            <div class="p-col-12 p-md-6 p-lg-4">
                                                    <label htmlFor="color">Brand</label><br />
                                                     <input value={brand} id="icon" type="text" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setBrand(e.target.value)} />
                                            </div>
                                            <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="color">Description</label><br />
                                                     <input value={description} id="icon" type="text" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setDescription(e.target.value)} />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                    <label htmlFor="color">Price</label><br />
                                                     <input value={price} id="icon" type="text" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setPrice(e.target.value)} />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="color">CountInStock</label><br />
                                                     <input value={countInStock} id="icon" type="text" className="p-mt-1" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setCountInStock(e.target.value)} />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                    <label htmlFor="color">isFeatured</label><br />
                                                     <InputSwitch checked={isFeatured} className="p-mt-1" onChange={(e) => setisFeatured(e.value)} />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="color">Select an image:</label><br />
                                                     <input value={image} id="icon" type="text" className="p-mt-1" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                        onChange={(e) => setImage(e.target.value)} />
                                                    
                                                    <input type="file" id="myfile" name="myfile" 
                                                        onChange={uploadFileHandler}
                                                        />
                                                    {uploading && <Loader/>}
                                             </div>   
                                         </div>
                                </div>
                     
                            </div>
                            </form>
                            </Card>
                            </main>
            </div> 
        
        </>
    )
}

export default ProductEditScreen
