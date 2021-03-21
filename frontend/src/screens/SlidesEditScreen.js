import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../components/Loader.js'
import Message from '../components/Message.js'
import { getSlideDetails , updateSlide} from '../actions/slideActions'
import { SLIDE_UPDATE_RESET } from '../constants/slideConstants'
import AdminScreen from './AdminScreen.js'


const TestimonilaEditScreen = ({ match, history }) => {
    const slideId = match.params.id
    
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [comment1, setComment1] = useState('')
    const [comment2, setComment2] = useState('')
    const [uploading, setUploading] = useState(false)



    const dispatch = useDispatch() 

    const sildeDetails = useSelector(state => state.sildeDetails)
    const { loading, error, slide } = sildeDetails

    const slideUpdate = useSelector(state => state.slideUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = slideUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SLIDE_UPDATE_RESET })
            history.push('/admin/slidelist')
        }
        
          if (!slide.title || slide._id !== slideId) {
            dispatch(getSlideDetails(slideId))
        }
        else {
            setTitle(slide.title)
            setImage(slide.image)
            setComment1(slide.comment1)
            setComment2(slide.comment2)
            
        }  
         
        
    }, [dispatch, history , slideId, slide, successUpdate ]) 

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
        dispatch(updateSlide({
            _id: slideId,
            title,
            image,
            comment1,
            comment2


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
                    <strong>Edit Slides</strong>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message>{errorUpdate}</Message>}
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                            <form onSubmit={submitHandler}>
                                <input type="text" value={title} placeholder="name"
                                    name="name" required
                                    onChange={(e) => setTitle(e.target.value)}
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
                                <input type="text" value={comment1} placeholder="comment"
                                    name="comment" required
                                    onChange={(e) => setComment1(e.target.value)}
                                />
                                <input type="text" value={comment2} placeholder="comment"
                                    name="comment2" required
                                    onChange={(e) => setComment2(e.target.value)}
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

export default TestimonilaEditScreen
