import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listColors, deleteColor } from '../../../actions/colorActions.js'
import AdminScreen from '../AdminScreen'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';


const ColorListScreen = ({ match, history }) => {

     const dispatch = useDispatch()

    const colorList = useSelector(state => state.colorList) 
    const { loading, error, colors } = colorList
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const colorDelete = useSelector(state => state.colorDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = colorDelete
    
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login') 
        }
        dispatch(listColors())
       
    }, [ dispatch, history, userInfo, successDelete])
    
     const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this color')) {
            dispatch(deleteColor(id))
        }
        
    }
    
    const leftContents = (
    <React.Fragment>
            <div >
                <Link to={'/admin/colors/create/new'}>
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
           <Card title="Colors" subTitle="List of all colors">
    <div className="p-grid">
      <div className="p-col-12">
        <Toolbar left={leftContents}/>
         
      </div>
    </div>
    <div className ="p-grid">
                                <div className="p-col-12">
                                    {loadingDelete && <Loader />}
                            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                            
                             <div className="table-responsive " style={{overflowX:"auto"}}>
                                        <table className="table" >
                                    <thead>
                                        <tr>
                                            <td>COLOR1</td>
                                            <td>COLOR2</td>
                                            <td>COLOR3</td>
                                            <td>COLOR4</td>
                                            <td>COLOR5</td>
                                            <td>COLOR6</td>
                                            <td>COLOR7</td>
                                            <td>COLOR8</td>
                                            <td>COLOR9</td>
                                            <td>COLOR10</td>
                                            <td>COLOR11</td>
                                            <td>COLOR12</td>
                                            <td>PRODUCT</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                             {colors.map(color => (
                                            <>
                                           {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                                            <tr key={color.id}>
                                               <td>{color.color1}</td>
                                               <td>{color.color2}</td>
                                               {color.color3.value != null &&  
                                               <td>{color.color3} </td>
                                               } 
                                               <td>{color.color4}</td>
                                               <td>{color.color5}</td>
                                               <td>{color.color6} </td>
                                               <td>{color.color7}</td>
                                               <td>{color.color8}</td>
                                               <td>{color.color9} </td>
                                               <td>{color.color10}</td>
                                               <td>{color.color11}</td>
                                               <td>{color.color12} </td>
                                               <td>{color.product.name} </td>
                                                <td style={{display: "flex"}}>
                                                   <Button 
                                                    icon="pi pi-trash"
                                                    className="p-button-danger p-mr-2"
                                                    onClick={() => deleteHandler(color.id)}
                                                ></Button>
                                             <Link to={`/admin/colors/${color.id}`}> 
                                            <Button 
                                            icon="pi pi-pencil"
                                                           className="p-button-success p-mr-2"
                                                            
                                                    ></Button>
                                                 </Link>  
                                                </td>
                                                
                                                </tr>
                                                
                                                  )}   
                                                  </>
                                         ))}
                                    </tbody>
                                </table>         
                                        </div>
                                     
      </div>
                              
    </div>
  </Card>
        </main>
    </div> 


        </>
    
    )

}


export default ColorListScreen