import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createTestimonial, deleteTestimonial, listTestimonials } from '../actions/testimonialActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { CREATE_TESTIMONIAL_RESET } from '../constants/testimonialConstants'
import AdminScreen from './AdminScreen'


const TestimonialListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const testimonialList = useSelector((state) => state.testimonialList)
    const { loading, error, testimonials } = testimonialList
    

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const testimonialDelete = useSelector((state) => state.testimonialDelete)
    const { success:successDelete } = testimonialDelete
    
    const testimonialRegister = useSelector((state) => state.testimonialRegister)
    const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    testimonials: createdTestimonial,
    } = testimonialRegister
  
    useEffect(() => {
    dispatch({ type: CREATE_TESTIMONIAL_RESET })
        if (!userInfo || !userInfo.isAdmin){
        history.push('/login')
        }
    if (successCreate) {
      history.push(`/admin/testimonials/${createdTestimonial._id}/edit`)
    } 
    else {
        dispatch(listTestimonials()) 
    }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdTestimonial])
    

    const createTestimonialHandler = () => {
        dispatch(createTestimonial())
    }
    var today = new Date(),
    todydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this testimonial')) {
            dispatch(deleteTestimonial(id)) 
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
                                            <div className="card-header">
                                            <h3>Testimonials</h3>
                                                <button className="btn-dash"onClick={createTestimonialHandler} ><i className="fa fa-plus"></i> Create Testimonial</button>
                                            </div>
                                            <div className="card-body">
                                    
                                                <div className="table-responsive">
                                                    <table>
                                                        <thead>
                                                            <tr >
                                                                <td>NAME</td>
                                                                <td>COMMENT</td>
                                                                <td>IMAGE</td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </thead>
                                                    <tbody>
                                                        {testimonials.map(testimonial => ( 
                                                            <tr key={testimonial._id}>
                                                                <td className="txtName">{testimonial.name}</td>
                                                                <td className="txtName">{testimonial.comment}</td>
                                                                <td className="txtName">{testimonial.image}</td>
                                                                <td className="txtName">
                                                                    <Link to={`/admin/testimonials/${testimonial._id}/edit`}>
                                                                        <i className='fa fa-edit'></i>
                                                                    </Link>
                                                                </td>
                                                                <td className="txtName">
                                                                    <button  onClick={() => deleteHandler(testimonial._id)}><i className='fa fa-trash'></i></button>
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

export default TestimonialListScreen
