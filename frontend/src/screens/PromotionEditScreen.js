import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../components/Loader.js'
import Message from '../components/Message.js'
import AdminScreen from './AdminScreen.js'
import { PROMOTION_UPDATE_RESET } from '../constants/promotionConstants.js'
import { getPromotionDetails, updatePromotion } from '../actions/promotionActions.js'


const PromotionEditScreen = ({ match, history }) => {
    const promotionsID = match.params.id
    
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)


 
    const dispatch = useDispatch() 

    const promotionDetails = useSelector(state => state.promotionDetails)
    const { loading, error, promotion } = promotionDetails

    const promotionUpdate = useSelector(state => state.promotionUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = promotionUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PROMOTION_UPDATE_RESET })
            history.push('/admin/promotionlist')
        }
        
          if (!promotion.name || promotion._id !== promotionsID) {
            dispatch(getPromotionDetails(promotionsID))
        }
        else {
            setName(promotion.name)
            setImage(promotion.image)
             
        }  
         
        
    }, [dispatch, history , promotionsID, promotion, successUpdate ]) 

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
        dispatch(updatePromotion({
            _id: promotionsID,
            name,
            image,
            

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
                    <strong>Edit Promotion</strong>
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

export default PromotionEditScreen
