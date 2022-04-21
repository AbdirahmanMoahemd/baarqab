import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {  listCategoryDetails, updateCategory} from '../../../actions/categoryAction'
import AdminScreen from '../AdminScreen'
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { CATEGORY_UPDATE_RESET } from '../../../constants/categoryConstants'


const CategoryEditScreen = ({ match, history }) => {
    const categoryId = match.params.id
   
    
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('')
    const [color, setColor] = useState('')
    const [uploading, setUploading] = useState([])

    const dispatch = useDispatch()

    

    const categoryDetails = useSelector(state => state.categoryDetails)
    const { loading, error, category } = categoryDetails

    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = categoryUpdate
    
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            history.push('/admin/category')
        }
        else {
            if (!category.name || category.id !== categoryId) {
                dispatch(listCategoryDetails(categoryId))
            }
            else {
                setName(category.name)
                setIcon(category.icon)
                setColor(category.color)
             
            }
        }
    
    }, [ dispatch, history, successUpdate, categoryId,category])
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('icon', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/iconupload', formData, config)
            setIcon(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const updateCategoryFun = () => {
    dispatch(updateCategory({
            _id: categoryId,
            name,
            icon,
            color,
            
        }))
    }
     const submitHandler = (e) => {
           
         e.preventDefault() 
             updateCategoryFun();
    }
    
    

    const leftContents = (
    <React.Fragment>
            <div >
            <Button 
            label='update'
            className="p-button-primary mr-2"
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
             <div className="main-content">
                 <main>
                     <Card title="Categories" subTitle="You can edit categories here">
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
                                             <div class="p-col-12 p-md-6 p-lg-4 mt-2">
                                                 <label htmlFor="name">Name</label><br />
                                                 <input value={name} id="name" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setName(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 mt-2">
                                                 <label htmlFor="icon">Icon</label><br />
                                                 <input value={icon} id="icon" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setIcon(e.target.value)} />
                                                 <input type="file" id="myfile" name="myfile" 
                                                        onChange={uploadFileHandler}
                                                        />
                                                    {uploading && <Loader/>}
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 mt-2">
                                                 <label htmlFor="color">Color</label><br />
                                                 <ColorPicker value={color} style={{fontSize: ".9rem", height: "30px",width: "80%"}} onChange={(e) => setColor(e.value)} />
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
     )

}


export default CategoryEditScreen