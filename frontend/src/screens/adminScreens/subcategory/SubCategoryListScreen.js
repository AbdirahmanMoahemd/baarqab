import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listSubCategories, deleteSubCategory } from '../../../actions/subcategoryActions'
import AdminScreen from '../AdminScreen'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';


const SubCategoryListScreen = ({ match, history }) => {

     const dispatch = useDispatch()

    
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const subcategoryList = useSelector(state => state.subcategoryList) 
    const { loading, error, subcategories } = subcategoryList

    const subcategoryDelete = useSelector(state => state.subcategoryDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = subcategoryDelete
    
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login') 
        }
        dispatch(listSubCategories())
       
    }, [
        dispatch, history, userInfo, successDelete])
    
     const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this subcategory')) {
            dispatch(deleteSubCategory(id))
        }
        
    }
    
    const leftContents = (
    <React.Fragment>
            <div >
                <Link to={'/admin/subcategory/create/new'}>
            <Button 
            label="New"
            className="p-button-success  p-mr-2"
            icon="pi pi-plus"
            ></Button>
                </Link>
            <Button 
            label="Refresh"
            className="p-button-primary"
            icon="pi pi-refresh"
            onClick={() => window.location.reload(false)}
            ></Button>
          </div> 
    </React.Fragment>
);
    
        return (
        <>
            <AdminScreen/>
            <p-toast></p-toast>

<div className="main-content">
        <main>
           <Card title="Sub Categories" subTitle="List of all sub categories">
    <div className="p-grid">
      <div className="p-col-12">
        <Toolbar left={leftContents}/>
         
      </div>
    </div>
    <div className ="p-grid">
                                <div className="p-col-12">
                                    {loadingDelete && <Loader />}
                            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                             <div className="table-responsive " style={{overflowX:"auto"}}>
                                        <table className="table" >
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>Category</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {subcategories.map(subcategory => (
                                            <tr key={subcategory.id}>
                                               <td>{subcategory.name}</td>
                                               <td>{subcategory.category.name}</td>
                                                <td>
                                                   <Button 
                                                    icon="pi pi-trash"
                                                    className="p-button-danger p-mr-2"
                                                    onClick={() => deleteHandler(subcategory.id)}
                                                ></Button>
                                             <Link to={`/admin/subcategory/${subcategory.id}`}> 
                                            <Button 
                                            icon="pi pi-pencil"
                                                           className="p-button-success p-mr-2"
                                                           
                                                    ></Button>
                                                 </Link>  
                                                </td>
                                                
                                            </tr>
                                         ))}
                                    </tbody>
                                </table>         
                                        </div>
                                  )}        
      </div>
                              
    </div>
  </Card>
        </main>
    </div> 


        </>
    
    )

}


export default SubCategoryListScreen