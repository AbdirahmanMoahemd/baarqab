import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { createSubCategory  } from '../../../actions/subcategoryActions.js'
import AdminScreen from '../AdminScreen'
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { listCategories } from '../../../actions/categoryAction'

const SubCategoryCreateScreen = ({ history }) => {
    
    
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')


    const dispatch = useDispatch()

    

    const subcategoryCreate = useSelector(state => state.subcategoryCreate)
    const { loading: loadingCreate, error: errorCreate,success: successCreate, } = subcategoryCreate

    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList
    
      const submitHandler = (e) => {
           
         e.preventDefault() 
         dispatch(createSubCategory(name, category))
        }
    
    
    useEffect(() => {
        dispatch(listCategories())
       if (successCreate) { 
           history.push('/admin/subcategory/') 
        } 
    }, [ dispatch, history, successCreate])
    
    

     

    const leftContents = (
    <React.Fragment>
            <div >
            <Button 
            label='Create'
            className="p-button-primary mr-2"
                    icon="pi pi-plus"
            type="submit"
                ></Button>
            <Link to={'/admin/subcategory/'}>   
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
                     <Card title="Sub Categories" subTitle="You can add sub categories here">
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


export default SubCategoryCreateScreen