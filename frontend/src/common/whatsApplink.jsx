import React, { useRef, useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { listsettings } from '../actions/settingsActions'

const WhatsApplink = () => {
    const dispatch = useDispatch()

    
    
   
    
    const settingsList = useSelector(state => state.settingsList) 
    const { loading, error, settings } = settingsList

    
    
    useEffect(() => {
        dispatch(listsettings())
       
    }, [ dispatch])
    return (
    <>
            {settings.map(setting => (
                <a
                    href={`https://wa.me/${setting.whatsAppPhoneNumber}`}
                    class="whatsapp_float"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i class="fa fa-whatsapp whatsapp-icon"></i>
                </a>
            ))}
           </>
  )
}

export default WhatsApplink