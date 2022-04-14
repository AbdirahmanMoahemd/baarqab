import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { createPackage  } from '../../../actions/packageActions'
import AdminScreen from '../AdminScreen'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { listCategories } from '../../../actions/categoryAction'
import { InputSwitch } from 'primereact/inputswitch';



const PackageCreateScreen = ({ history }) => {
    
    
    const [packagename, setPackagename] = useState('')
    const [category, setCategory] = useState('')
    const [icon, setIcon] = useState('')
    const [isFeatured, setisFeatured] = useState(true)



    const dispatch = useDispatch()

    

    const packagesCreate = useSelector(state => state.packagesCreate)
    const { loading: loadingCreate, error: errorCreate,success: successCreate, } = packagesCreate

    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList
    
      const submitHandler = (e) => {
           
         e.preventDefault() 
         dispatch(createPackage(packagename, category,icon, isFeatured))
        }
    
    
    useEffect(() => {
        dispatch(listCategories())
       if (successCreate) { 
           history.push('/admin/packages/') 
        } 
    }, [ dispatch, history, successCreate])
    
    

     

    const leftContents = (
    <React.Fragment>
            <div >
            <Button 
            label='Create'
            className="p-button-primary p-mr-2"
                    icon="pi pi-plus"
            type="submit"
                ></Button>
            <Link to={'/admin/packages/'}>   
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
                     <Card title="Packages" subTitle="You can add packages here">
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
                                                 <label htmlFor="name">Package Name</label> <br />
                                                 <input value={packagename} id="name" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setPackagename(e.target.value)} />
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
                                         <div class="p-col-12 p-md-6 p-lg-4 p-mt-3">
                                                 <label htmlFor="name">Icon</label> <br />
                                                 <input value={icon} id="name" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setIcon(e.target.value)} />
                                             </div>
                                         <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                    <label htmlFor="color">isFeatured</label><br />
                                                     <InputSwitch checked={isFeatured} className="p-mt-1" onChange={(e) => setisFeatured(e.value)} />
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


export default PackageCreateScreen