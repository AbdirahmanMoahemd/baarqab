import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {  getSettingsDetails, updateSettings} from '../../../actions/settingsActions'
import AdminScreen from '../AdminScreen'
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { SETTINGS_UPDATE_RESET } from '../../../constants/settingsConstants'
import { listCategories } from '../../../actions/categoryAction'
import { InputSwitch } from 'primereact/inputswitch';
import { InputTextarea } from 'primereact/inputtextarea';



const SettingsEditScreen = ({history,match }) => {
  const settingsId = match.params.id
   
    
    const [serviceTitle1, setServiceTitle1] = useState('')
    const [serviceDecs1, setServiceDecs1] = useState('')
    const [serviceTitle2, setServiceTitle2] = useState('')
    const [serviceDecs2, setServiceDecs2] = useState('')
    const [serviceTitle3, setServiceTitle3] = useState('')
    const [serviceDecs3, setServiceDecs3] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [about, setAbout] = useState('')
    const [aboutImg, setAboutImg] = useState('')
    const [uploading, setUploading] = useState(false)
    const [whatsAppPhoneNumber, setWhatsAppPhoneNumber] = useState('')


    const dispatch = useDispatch()

    

    const settingsDetails = useSelector(state => state.settingsDetails)
    const { loading, error, settings } = settingsDetails

    const settingsUpdate = useSelector(state => state.settingsUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = settingsUpdate
    
    
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SETTINGS_UPDATE_RESET })
            history.push('/admin/settings')
        }
        else {
            if (!settings.phoneNumber || settings.id !== settingsId) {
                dispatch(getSettingsDetails(settingsId))
            }
            else {
                setServiceTitle1(settings.serviceTitle1)
                setServiceDecs1(settings.serviceDecs1)
                setServiceTitle2(settings.serviceTitle2)
                setServiceDecs2(settings.serviceDecs2)
                setServiceTitle3(settings.serviceTitle3)
                setServiceDecs3(settings.serviceDecs3)
                setPhoneNumber(settings.phoneNumber)
                setAbout(settings.about)
                setAboutImg(settings.aboutImg)
                setWhatsAppPhoneNumber(settings.whatsAppPhoneNumber)
            }
        }
    
    }, [ dispatch, history, successUpdate, settingsId,settings])
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
            setAboutImg(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    

    const updateCategoryFun = () => {
    dispatch(updateSettings({
            _id: settingsId,
            serviceTitle1,
            serviceDecs1,
            serviceTitle2,
            serviceDecs2,
            serviceTitle3,
            serviceDecs3,
            phoneNumber,
            about,
            aboutImg,
            whatsAppPhoneNumber
        }))
    }
     const submitHandler = (e) => {
           
         e.preventDefault() 
             updateCategoryFun();
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
             <AdminScreen />
             <div className="main-content">
                 <main>
                     <Card title="Settings" subTitle="You can edit settings here">
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
                                             <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                 <label htmlFor="name">Service Title1</label><br />
                                                 <input value={serviceTitle1} id="name" type="text" style={{fontSize: ".9rem", height: "35px",width: "80%"}}
                                                     onChange={(e) => setServiceTitle1(e.target.value)} />
                                             </div>
                                              <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                 <label htmlFor="name">Service Description1</label><br />
                                                 <input value={serviceDecs1} id="name" type="text" style={{fontSize: ".9rem", height: "35px",width: "80%"}}
                                                     onChange={(e) => setServiceDecs1(e.target.value)} />
                                             </div>
                                              <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                 <label htmlFor="name">Service Title2</label><br />
                                                 <input value={serviceTitle2} id="name" type="text" style={{fontSize: ".9rem", height: "35px",width: "80%"}}
                                                     onChange={(e) => setServiceTitle2(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                 <label htmlFor="name">Service Description2</label><br />
                                                 <input value={serviceDecs2} id="name" type="text" style={{fontSize: ".9rem", height: "35px",width: "80%"}}
                                                     onChange={(e) => setServiceDecs2(e.target.value)} />
                                             </div>
                                              <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                 <label htmlFor="name">Service Title3</label><br />
                                                 <input value={serviceTitle3} id="name" type="text" style={{fontSize: ".9rem", height: "35px",width: "80%"}}
                                                     onChange={(e) => setServiceTitle3(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                 <label htmlFor="name">Service Description3</label><br />
                                                 <input value={serviceDecs3} id="name" type="text" style={{fontSize: ".9rem", height: "35px",width: "80%"}}
                                                     onChange={(e) => setServiceDecs3(e.target.value)} />
                                             </div>
                                            <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                 <label htmlFor="name">PhoneNumber</label> <br />
                                                 <input value={phoneNumber} id="name" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setPhoneNumber(e.target.value)} />
                                             </div>
                                              <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                 <label htmlFor="name">WhatsApp PhoneNumber</label> <br />
                                                 <input value={whatsAppPhoneNumber} id="name" type="text" style={{fontSize: ".9rem", height: "30px",width: "80%"}}
                                                     onChange={(e) => setWhatsAppPhoneNumber(e.target.value)} />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                 <label htmlFor="name">About</label> <br />
                                                 <InputTextarea rows={5} cols={30} value={about} style={{fontSize: ".9rem", height: "60px",width: "80%"}}
                                                     onChange={(e) => setAbout(e.target.value)} autoResize />
                                             </div>
                                             <div class="p-col-12 p-md-6 p-lg-4 mt-3">
                                                        <label htmlFor="color">Select an image:</label><br />
                                                        <input  value={aboutImg} id="icon" type="text" style={{width: "80%", height: "35px"}} className="p-mt-2"
                                                        onChange={(e) => setAboutImg(e.target.value)} />
                                                    
                                                    <input type="file" id="myfile" name="myfile" className="mt-2"
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

}

export default SettingsEditScreen