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
import { Dropdown } from 'primereact/dropdown';
import { Form } from 'react-bootstrap';

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
    const [url1,setUrl1] = useState('')
    const [url2,setUrl2] = useState('')
    const [url3,setUrl3] = useState('')
    const [url4,setUrl4] = useState('')

    const [images, setImages] = useState([])
    const [temColor, setTemColor] = useState('')
    const [Colors, setColors] = useState([])
    const [temSize, setTemSizes] = useState('')
    const [Sizes, setSizes] = useState([])
    const [uploading, setUploading] = useState(false)
    const [uploading0, setUploading0] = useState(false)
    const [uploading1, setUploading1] = useState(false)
    const [uploading2, setUploading2] = useState(false)
    const [uploading3, setUploading3] = useState(false)

 
    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate,success: successCreate, } = productCreate


    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    const submitHandler = (e) => {
        let size1 
        let size2  
        let size3  
        let size4  
        let size5  
        let size6  
        let size7  
        let size8  
        let size9  
        let size10  
        let size11  
        let size12  
        let size13  

        let color1   
        let color2  
        let color3  
        let color4  
        let color5  
        let color6  
        let color7  
        let color8  
        let color9  
        let color10  
        let color11  
        let color12  
        let color13  
        
        if (temColor != '' || temSize != '') {
            color1 = temColor.split(',')[0] 
            color2 = temColor.split(',')[1]
            color3 = temColor.split(',')[2]
            color4 = temColor.split(',')[3]
            color5 = temColor.split(',')[4]
            color6 = temColor.split(',')[5]
            color7 = temColor.split(',')[6]
            color8 = temColor.split(',')[7]
            color9 = temColor.split(',')[8]
            color10 = temColor.split(',')[9]
            color11 = temColor.split(',')[10]
            color12 = temColor.split(',')[11]
            color13 = temColor.split(',')[13]
            
            size1 = temSize.split(',')[0]   
            size2 = temSize.split(',')[1]
            size3 = temSize.split(',')[2]
            size4 = temSize.split(',')[3]
            size5 = temSize.split(',')[4]
            size6 = temSize.split(',')[5]
            size7 = temSize.split(',')[6]
            size8 = temSize.split(',')[7]
            size9 = temSize.split(',')[8]
            size10 = temSize.split(',')[9]
            size11 = temSize.split(',')[10]
            size12 = temSize.split(',')[11]
            size13 = temSize.split(',')[13]
            
        } else {
            setColors([null])
            setSizes([null])
        }
        

        Sizes.push(size1)
        Sizes.push(size2)
        Sizes.push(size3)
        Sizes.push(size4)
        Sizes.push(size5)
        Sizes.push(size6)
        Sizes.push(size7)
        Sizes.push(size8)
        Sizes.push(size9)
        Sizes.push(size10)
        Sizes.push(size11)
        Sizes.push(size12)

        Colors.push(color1)
        Colors.push(color2)
        Colors.push(color3)
        Colors.push(color4)
        Colors.push(color5)
        Colors.push(color6)
        Colors.push(color7)
        Colors.push(color8)
        Colors.push(color9)
        Colors.push(color10)
        Colors.push(color11)
        Colors.push(color12)

        images.push(url1)
        images.push(url2)
        images.push(url3) 
        images.push(url4)
       

         e.preventDefault() 
       dispatch(createProduct(name, category, brand, description,
       price, countInStock, isFeatured, image, images, Colors, Sizes))
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

    const uploadFileHandler2 = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image6', file)
        setUploading0(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload6', formData, config)
            setUrl1(data)  
            setUploading0(false)
        } catch (error) {
            console.error(error)
            setUploading0(false)
        }
    }

    const uploadFileHandler3 = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image7', file)
        setUploading1(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload7', formData, config)
            setUrl2(data)  
            setUploading1(false)
        } catch (error) {
            console.error(error)
            setUploading1(false)
        }
    }

    const uploadFileHandler4 = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image3', file)
        setUploading2(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload4', formData, config)
            setUrl3(data)  
            setUploading2(false)
        } catch (error) {
            console.error(error)
            setUploading2(false)
        }
    }

    const uploadFileHandler5 = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image4', file)
        setUploading3(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload5', formData, config)
            setUrl4(data)  
            setUploading3(false)
        } catch (error) {
            console.error(error)
            setUploading3(false)
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
                                                     onChange={(e) => setName(e.target.value)} placeholder='Name' required/>
                                             </div>
                                                <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="icon">Category</label><br />
                                                    <select name="" value={category} required style={{ height: "30px", borderRadius:"0%", width: "80%", fontSize: ".8rem"}}
                                                onChange={(e) => setCategory(e.target.value)} >
                                                    <option>Select Category here</option>
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
                                                     onChange={(e) => setBrand(e.target.value)} placeholder='Brand' required />
                                            </div>
                                            <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="color">Description</label><br />
                                                     <input  value={description} id="icon" type="text" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setDescription(e.target.value)} placeholder='Description' required />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4">
                                                    <label htmlFor="color">Price</label><br /> 
                                                     <input value={price} id="icon" type="text" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setPrice(e.target.value)} placeholder='Price'  />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="color">CountInStock</label><br />
                                                     <input value={countInStock} id="icon" type="text" className="p-mt-1" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setCountInStock(e.target.value)} placeholder='Count In Stock' />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                    <label htmlFor="color">isFeatured</label><br />
                                                     <InputSwitch checked={isFeatured} className="p-mt-1" onChange={(e) => setisFeatured(e.value)} />
                                        </div>
                                         <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="color">Colors<span style={{fontSize: '.7rem'}}>(optional)</span></label><br />
                                                     <input value={temColor} id="icon" type="text" className="p-mt-1" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setTemColor(e.target.value)} placeholder='Enter colors like this red,blue,green' />
                                        </div>
                                        <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="color">Sizes<span style={{fontSize: '.7rem'}}>(optional)</span></label><br />
                                                     <input value={temSize} id="icon" type="text" className="p-mt-1" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setTemSizes(e.target.value)} placeholder='Enter sizes like this XXL,XL,M' />
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 ">
                                                    <label htmlFor="color">Select an image:</label><br />
                                                     <input value={image} id="icon" type="text" className="p-mt-1" style={{fontSize: ".8rem", height: "30px",width: "80%"}}
                                                        onChange={(e) => setImage(e.target.value)} required />
                                                    
                                                    <input type="file" id="myfile" name="myfile" 
                                                        onChange={uploadFileHandler}
                                                        />
                                                    {uploading && <Loader/>}
                                        </div>
                                        <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                        <label htmlFor="color">Select an image1:</label><br />
                                                        <input style={{width: "100%"}} value={url1} id="icon" type="text" style={{width: "80%", height: "30px"}} className="p-mt-2"
                                                        onChange={(e) => setUrl1(e.target.value)} required />
                                                    
                                                    <input type="file" id="myfile" name="myfile" className="p-mt-2"
                                                        onChange={uploadFileHandler2}
                                                        />
                                                    {uploading0 && <Loader/>}
                                                </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                        <label htmlFor="color">Select an image2:</label><br />
                                                        <input style={{width: "100%"}} value={url2} id="icon" type="text" style={{width: "80%", height: "30px"}} className="p-mt-2"
                                                        onChange={(e) => setUrl2(e.target.value)} required />
                                                    
                                                    <input type="file" id="myfile" name="myfile" className="p-mt-2"
                                                        onChange={uploadFileHandler3}
                                                        /> 
                                                    {uploading1 && <Loader/>}
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                        <label htmlFor="color">Select an image3:</label><br />
                                                        <input style={{width: "100%"}} value={url3} id="icon" type="text" style={{width: "80%", height: "30px"}} className="p-mt-2"
                                                        onChange={(e) => setUrl3(e.target.value)} required />
                                                    
                                                    <input type="file" id="myfile" name="myfile" className="p-mt-2"
                                                        onChange={uploadFileHandler4}
                                                        /> 
                                                    {uploading2 && <Loader/>}
                                                </div>
                                            <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                        <label htmlFor="color">Select an image4:</label><br />
                                                        <input style={{width: "100%"}} value={url4} id="icon" type="text" style={{width: "80%", height: "30px"}} className="p-mt-2"
                                                        onChange={(e) => setUrl4(e.target.value)} required />
                                                    
                                                    <input type="file" id="myfile" name="myfile" className="p-mt-2"
                                                        onChange={uploadFileHandler5}
                                                        /> 
                                                    {uploading3 && <Loader/>}
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
