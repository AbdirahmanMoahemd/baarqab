import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {  listSubCategoryDetails, updateSubCategory} from '../../../actions/subcategoryActions'
import AdminScreen from '../AdminScreen'
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { SUBCATEGORY_UPDATE_RESET } from '../../../constants/subcategory'
import { listCategories } from '../../../actions/categoryAction'

const SubCategoryEditScreen = ({ match, history }) => {
    const subcategoryId = match.params.id
   
    
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')

    const dispatch = useDispatch()

    

    const subcategoryDetails = useSelector(state => state.subcategoryDetails)
    const { loading, error, subcategory } = subcategoryDetails

    const subcategoryUpdate = useSelector(state => state.subcategoryUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = subcategoryUpdate
    
    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SUBCATEGORY_UPDATE_RESET })
            history.push('/admin/subcategory')
        }
        else {
            if (!subcategory.name || subcategory.id !== subcategoryId) {
                dispatch(listSubCategoryDetails(subcategoryId))
                dispatch(listCategories())
            }
            else {
                setName(subcategory.name)
                setCategory(subcategory.category)
            }
        }
    
    }, [ dispatch, history, successUpdate, subcategoryId,subcategory])
    
    

    const updateCategoryFun = () => {
    dispatch(updateSubCategory({
            _id: subcategoryId,
            name,
            category,
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
             <div className="main-content">
                 <main>
                     <Card title="Sub Categories" subTitle="You can edit sub categories here">
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
                                             <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                 <label htmlFor="name">Name</label><br />
                                                 <input value={name} id="name" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setName(e.target.value)} />
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


export default SubCategoryEditScreen