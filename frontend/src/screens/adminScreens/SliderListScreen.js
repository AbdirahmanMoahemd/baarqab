import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteSlide, listSlides } from '../../actions/slideActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import AdminScreen from './AdminScreen'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

const SliderListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const slideList = useSelector((state) => state.slideList)
    const { loading, error, slides } = slideList
    
    const slideDelete = useSelector((state) => state.slideDelete)
    const { success:successDelete, loading:loadingDelete, error:errorDelete} = slideDelete

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    

  
    useEffect(() => {
      
    if (userInfo && userInfo.isAdmin) {
        dispatch(listSlides()) 
    } else {
      history.push('/login')
    }
  },[dispatch, history, userInfo, successDelete])
    var today = new Date(),
    todydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this slider')) {
            dispatch(deleteSlide(id)) 
        }
        
    }

     const leftContents = (
    <React.Fragment>
            <div >
                <Link to={'/admin/slide/create/new'}>
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
     )
    
    
    return (
        <>
            <AdminScreen />

            <p-toast></p-toast>

<div className="main-content">
        <main>
           <Card title="Sliders" subTitle="List of all slider">
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
                                            <td>Image</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {slides.map(slide => (
                                            <tr key={slide.id}>
                                               <td >
                                                    <img style={{width: "100%"}} src={slide.image} />
                                               </td> 
                                                <td>
                                                   <Button 
                                                    icon="pi pi-trash"
                                                    className="p-button-danger p-mr-2"
                                                    onClick={() => deleteHandler(slide._id)}
                                                ></Button>
                                             <Link to={`/admin/slide/${slide._id}/edit`}> 
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
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        
        </>
    )
}

export default SliderListScreen
