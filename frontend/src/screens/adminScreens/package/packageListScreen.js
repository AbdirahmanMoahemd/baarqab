import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listPackages, deletePackges } from '../../../actions/packageActions'
import AdminScreen from '../AdminScreen'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';


const PackageListScreen = ({ match, history }) => {

     const dispatch = useDispatch()

    
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const packagesList = useSelector(state => state.packagesList) 
    const { loading, error, packages } = packagesList

    const packagesDelete = useSelector(state => state.packagesDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = packagesDelete
    
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login') 
        }
        dispatch(listPackages())
       
    }, [
        dispatch, history, userInfo, successDelete])
    
     const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this package')) {
            dispatch(deletePackges(id))
        }
        
    }
    
    const leftContents = (
    <React.Fragment>
            <div >
                <Link to={'/admin/packages/create/new'}>
            <Button 
            label="New"
            className="p-button-success  mr-2"
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
           <Card title="Package" subTitle="List of all package">
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
                                            <td>Package Name</td>
                                            <td>Category</td>
                                            <td>Icon</td>
                                            <td>isFeatured</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {packages.map(packages => (
                                            <tr key={packages.id}>
                                               <td>{packages.packageName}</td>
                                               <td>{packages.category ? packages.category.name : 'not found'}</td>
                                               <td>{packages.icon}</td>
                                               <td>{packages.isFeatured ? 'Yes' : 'No'}</td>
                                                <td>
                                                   <Button  
                                                    icon="pi pi-trash"
                                                    className="p-button-danger p-mr-2"
                                                    onClick={() => deleteHandler(packages.id)}
                                                ></Button>
                                             <Link to={`/admin/packages/${packages.id}/edit`}> 
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


export default PackageListScreen