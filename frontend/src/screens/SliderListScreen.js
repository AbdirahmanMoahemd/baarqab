import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteSlide, listSlides } from '../actions/slideActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import AdminScreen from './AdminScreen'


const SliderListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const slideList = useSelector((state) => state.slideList)
    const { loading, error, slides } = slideList
    
    const slideDelete = useSelector((state) => state.slideDelete)
    const { success:successDelete } = slideDelete

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
        if (window.confirm('Are you sure to delete this user')) {
            dispatch(deleteSlide(id)) 
        }
        
    }

    
    
    return (
        <>
            <AdminScreen />
        <div className="main-content">
           <main>
             
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : ( 
                <>
                            
                                <div className="recent-grid testi" >
                                    <div className="projects">
                                        <div className="card">
                                            <div className="card-header test-card-header">
                                                <h3>Slider</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table>
                                                        <thead>
                                                            <tr >
                                                                <td>TITLE</td>
                                                                <td>COMMENT1</td>
                                                                <td>COMMENT2</td>
                                                                <td>IMAGE</td>
                                                                <td></td>
                                                            </tr>
                                                        </thead>
                                                    <tbody>
                                                        {slides.map(slide => ( 
                                                            <tr key={slide._id}>
                                                                <td className="txtName">{slide.title}</td>
                                                                <td className="txtName">{slide.comment1}</td>
                                                                <td className="txtName">{slide.comment2}</td>
                                                                <td className="txtName">{slide.image}</td>
                                                                <td className="txtName">
                                                                    <Link to={`/admin/slides/${slide._id}/edit`}>
                                                                        <i className='fa fa-edit'></i>
                                                                    </Link>
                                                                </td>
                                                                
                                                            </tr>
                                                             ))}
                                                        </tbody> 
                                                    </table>
                                   
                                                </div>
                                    
                        </div>
                                        </div>
                                    </div>
                                   
                                </div>
                           
                </>
                    )} 
            </main>
      </div>
        </>
    )
}

export default SliderListScreen
