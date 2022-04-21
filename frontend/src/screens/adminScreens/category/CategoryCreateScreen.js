import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { createCategory  } from '../../../actions/categoryAction.js'
import AdminScreen from '../AdminScreen'
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';


const CategoryCreateScreen = ({ history }) => {
    
    
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('')
    const [color, setColor] = useState('')
    const [uploading, setUploading] = useState([])


    const dispatch = useDispatch()

    

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { loading: loadingCreate, error: errorCreate,success: successCreate, } = categoryCreate

    
      const submitHandler = (e) => {
           
         e.preventDefault() 
         dispatch(createCategory(name, icon, color))
        }
    
    
    useEffect(() => {
        
       if (successCreate) { 
           history.push('/admin/category/') 
        } 
    }, [ dispatch, history, successCreate])
    
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

     

    const leftContents = (
    <React.Fragment>
            <div >
            <Button 
            label='Create'
            className="p-button-primary mr-2"
                    icon="pi pi-plus"
            type="submit"
                ></Button>
            <Link to={'/admin/category/'}>   
            <Button 
            label="Cancle"
            className="p-button-secondary"
            icon="pi pi-arrow-circle-left"
            ></Button>
            </Link> 
          </div> 
    </React.Fragment>
    );
    

     return (
        <>
             <AdminScreen />
             <div className="main-content">
                 <main>
                     <Card title="Categories" subTitle="You can add categories here">
                          <form onSubmit={submitHandler}>
                          <div className="p-grid mb-5">
                                <div class="p-col-12">
                                     <Toolbar left={leftContents} />
                                </div>
                         </div>
                        <div class="p-grid" > 
                                 <div class="p-col-12">
                                {loadingCreate && <Loader />}
                                     {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                                     
                                         <div class="p-fluid p-formgrid p-grid" >
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-3">
                                                 <label htmlFor="name">Name</label> <br />
                                                 <input value={name} id="name" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setName(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-3">
                                                 <label htmlFor="icon">Icon</label><br />
                                                 <input value={icon} id="icon" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                 onChange={(e) => setIcon(e.target.value)}
                                             
                                             />
                                             <input type="file" id="myfile" name="myfile" 
                                                        onChange={uploadFileHandler}
                                                        />
                                                    {uploading && <Loader/>}
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-3">
                                                 <label htmlFor="color" >Color</label><br />
                                                 <ColorPicker value={color} style={{fontSize: ".9rem", height: "30px",width: "80%"}} onChange={(e) => setColor(e.value)} />
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


export default CategoryCreateScreen