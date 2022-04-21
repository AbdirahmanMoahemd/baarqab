import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {  getPackageDetails, updatePackages} from '../../../actions/packageActions'
import AdminScreen from '../AdminScreen'
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { PACKAGE_UPDATE_RESET } from '../../../constants/packageConstants'
import { listCategories } from '../../../actions/categoryAction'
import { InputSwitch } from 'primereact/inputswitch';



const PackageEditScreen = ({ match, history }) => {
    const packageId = match.params.id
   
    
    const [packageName, setPackageName] = useState('')
    const [category, setCategory] = useState('')
    const [icon, setIcon] = useState('')
    const [isFeatured, setisFeatured] = useState(true)
    const dispatch = useDispatch()

    

    const packagesDetails = useSelector(state => state.packagesDetails)
    const { loading, error, packages } = packagesDetails

    const packagesUpdate = useSelector(state => state.packagesUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = packagesUpdate
    
    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList
    console.log(packages)
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PACKAGE_UPDATE_RESET })
            history.push('/admin/packages')
        }
        else {
            if (!packages.packageName || packages.id !== packageId) {
                dispatch(getPackageDetails(packageId))
                dispatch(listCategories())
            }
            else {
                setPackageName(packages.packageName)
                setCategory(packages.category)
                setIcon(packages.icon)
                setisFeatured(packages.isFeatured)
            }
        }
    
    }, [ dispatch, history, successUpdate, packageId,packages])
    
    

    const updateCategoryFun = () => {
    dispatch(updatePackages({
            _id: packageId,
            packageName,
        category,
        icon,
            isFeatured
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
                     <Card title="Packages" subTitle="You can edit packages here">
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
                                                 <input value={packageName} id="name" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setPackageName(e.target.value)} />
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


export default PackageEditScreen