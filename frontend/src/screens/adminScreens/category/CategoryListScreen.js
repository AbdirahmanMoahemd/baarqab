import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listCategories, deleteCategory } from '../../../actions/categoryAction'
import AdminScreen from '../AdminScreen'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';


const CategoryListScreen = ({ match, history }) => {

     const dispatch = useDispatch()

    
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const categoryList = useSelector(state => state.categoryList) 
    const { loading, error, categories } = categoryList

    const categoryDelete = useSelector(state => state.categoryDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = categoryDelete
    
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login') 
        }
        dispatch(listCategories())
       
    }, [
        dispatch, history, userInfo, successDelete])
    
     const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this category')) {
            dispatch(deleteCategory(id))
        }
        
    }
    
    const leftContents = (
    <React.Fragment>
            <div >
                <Link to={'/admin/category/create/new'}>
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
           <Card title="Categories" subTitle="List of all categories">
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
                                            <td>NAME</td>
                                            <td>ICON</td>
                                            <td>COLOR</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {categories.map(category => (
                                            <tr key={category.id}>
                                               <td>{category.name}</td>
                                               <td>{category.icon}</td>
                                               <td>{category.color} </td>
                                                <td>
                                                   <Button 
                                                    icon="pi pi-trash"
                                                    className="p-button-danger p-mr-2"
                                                    onClick={() => deleteHandler(category.id)}
                                                ></Button>
                                             <Link to={`/admin/category/${category.id}`}> 
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


export default CategoryListScreen