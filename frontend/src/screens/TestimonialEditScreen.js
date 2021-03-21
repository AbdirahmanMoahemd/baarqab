import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../components/Loader.js'
import Message from '../components/Message.js'
import { getTestimonialDetails , updateTestimonial} from '../actions/testimonialActions'
import { TESTIMONIAL_UPDATE_RESET } from '../constants/testimonialConstants.js'
import AdminScreen from './AdminScreen.js'


const TestimonialEditScreen = ({ match, history }) => {
    const testimonialsID = match.params.id
    
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [comment, setComment] = useState('')
    const [uploading, setUploading] = useState(false)


 
    const dispatch = useDispatch() 

    const testimonialDetails = useSelector(state => state.testimonialDetails)
    const { loading, error, testimonials } = testimonialDetails

    const testimonialUpdate = useSelector(state => state.testimonialUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = testimonialUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: TESTIMONIAL_UPDATE_RESET })
            history.push('/admin/testimoniallist')
        }
        
          if (!testimonials.name || testimonials._id !== testimonialsID) {
            dispatch(getTestimonialDetails(testimonialsID))
        }
        else {
            setName(testimonials.name)
            setImage(testimonials.image)
            setComment(testimonials.comment)
             
        }  
          
        
    }, [dispatch, history , testimonialsID, testimonials, successUpdate ]) 

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e)  => {
        e.preventDefault()
        dispatch(updateTestimonial({
            _id: testimonialsID,
            name,
            image,
            comment
            

        }))
    }
    return (
        <>
           return (
        <>
            <AdminScreen />
            <div className="main-content userlists">
            
                <div className="form">
                <div className="login-form">
                    <strong>Edit Testimonials</strong>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message>{errorUpdate}</Message>}
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                            <form onSubmit={submitHandler}>
                                <input type="text" value={name} placeholder="name"
                                    name="name" required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input type="text" value={image} placeholder="image url"
                                    name="image" required
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <label for="myfile">Select an image:</label>
                                <input type="file" id="myfile" name="myfile"
                                    onChange={uploadFileHandler}
                                    />
                                {uploading && <Loader/>}
                                <input type="text" value={comment} placeholder="comment"
                                    name="comment" required
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                
                               
                                <button type="submit" value="" >Update</button>
                            </form>
                        )}
                </div>

                
                
                            
                     <p className="wt"> .</p>
                     <p className="wt"> .</p>       
            </div>  
       
            </div> 
        </>
    )  
        </>
    )
}

export default TestimonialEditScreen
