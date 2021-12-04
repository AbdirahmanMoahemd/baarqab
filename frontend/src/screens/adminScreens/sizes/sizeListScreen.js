import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listSizes, deleteSize } from '../../../actions/sizeActions.js'
import AdminScreen from '../AdminScreen'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';


const SizeListScreen = ({ match, history }) => {

     const dispatch = useDispatch()

    const sizeList = useSelector(state => state.sizeList) 
    const { loading, error, sizes } = sizeList
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const sizeDelete = useSelector(state => state.sizeDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = sizeDelete
    
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login') 
        }
        dispatch(listSizes())
       
    }, [ dispatch, history, userInfo, successDelete])
    
     const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this size')) {
            dispatch(deleteSize(id))
        }
        
    }
    
    const leftContents = (
    <React.Fragment>
            <div >
                <Link to={'/admin/sizes/create/new'}>
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
           <Card title="Sizes" subTitle="List of all sizes">
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
                                            <td>SIZE1</td>
                                            <td>SIZE2</td>
                                            <td>SIZE3</td>
                                            <td>SIZE4</td>
                                            <td>SIZE5</td>
                                            <td>SIZE6</td>
                                            <td>SIZE7</td>
                                            <td>SIZE8</td>
                                            <td>SIZE9</td>
                                            <td>SIZE10</td>
                                            <td>SIZE11</td>
                                            <td>SIZE12</td>
                                            <td>PRODUCT</td>
                                                        <td></td>
                                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {sizes.map(size => (
                                            <tr key={size.id}>
                                               <td>{size.size1}</td>
                                               <td>{size.size2}</td>
                                               <td>{size.size3} </td> 
                                               <td>{size.size4}</td>
                                               <td>{size.size5}</td>
                                               <td>{size.size6} </td>
                                               <td>{size.size7}</td>
                                               <td>{size.size8}</td>
                                               <td>{size.size9} </td>
                                               <td>{size.size10}</td>
                                               <td>{size.size11}</td>
                                               <td>{size.size12} </td>
                                               <td>{size.product.name} </td>
                                                <td style={{display: 'flex'}}>
                                                   <Button 
                                                    icon="pi pi-trash"
                                                    className="p-button-danger p-mr-2"
                                                    onClick={() => deleteHandler(size.id)}
                                                   ></Button>
                                              
                                             <Link to={`/admin/sizes/${size.id}`}> 
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


export default SizeListScreen