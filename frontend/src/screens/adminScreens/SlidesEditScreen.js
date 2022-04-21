import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../../components/Loader.js'
import Message from '../../components/Message.js'
import { getSlideDetails , updateSlide} from '../../actions/slideActions'
import { SLIDE_UPDATE_RESET } from '../../constants/slideConstants'
import AdminScreen from './AdminScreen.js'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

const SlidesEditScreen = ({ match, history }) => {
    const slideId = match.params.id
    
    const [image, setImage] = useState('')
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
        
          if (!slide.image || slide._id !== slideId) {
            dispatch(getSlideDetails(slideId))
        }
        else {
            setImage(slide.image)
            
        }  
         
        
    }, [dispatch, history , slideId, slide, successUpdate ]) 

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('slide', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/slideupload', formData, config)
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
            image,

        }))
    }

     const leftContents = (
    <React.Fragment>
            <div >
            <Button 
            label='update'
            className="p-button-primary mr-2"
                    icon="pi pi-plus"
            type="submit"
            ></Button>
            <Button 
            label="Cancle"
            className="p-button-secondary"
            icon="pi pi-arrow-circle-left"
            ></Button>
          </div> 
    </React.Fragment>
);


    return (
        <>
           return (
        <>
                <AdminScreen />
                <div className="main-content">
                 <main>
                     <Card title="Sliders" subTitle="You can edit sliders here">
                          <form onSubmit={submitHandler}>
                          <div className="p-grid mb-5">
                                <div class="p-col-12">
                                      <Toolbar left={leftContents}/>
                                </div>
                         </div>
                        <div class="p-grid" > 
                                 <div class="p-col-12">
                                     {loadingUpdate && <Loader />}
                                    {errorUpdate && <Message>{errorUpdate}</Message>}
                                     {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                                         <div class="p-fluid p-formgrid p-grid" >
                                            <div class="p-col-12 p-md-6 p-lg-4 p-mt-2">
                                                        <label htmlFor="color">Select an image:</label><br />
                                                        <input  value={image} id="icon" type="text" style={{width: "80%", height: "30px"}} className="p-mt-2"
                                                        onChange={(e) => setImage(e.target.value)} />
                                                    
                                                    <input type="file" id="myfile" name="myfile" className="p-mt-2"
                                                        onChange={uploadFileHandler}
                                                        />
                                                    {uploading && <Loader/>}
                                                </div>
                                             
                                            
                                         </div>
                                     )}
                                </div>
                        </div>
                        </form>
                     </Card>


            
             </main>
              </div>
        </>
    )  
        </>
    )
}

export default SlidesEditScreen
