import React, { useRef, useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { listsettings } from '../../actions/settingsActions'

const Head = () => {
  const dispatch = useDispatch()
  
  const settingsList = useSelector(state => state.settingsList) 
    const { loading, error, settings}  = settingsList

   useEffect(() => { 
      
       
        dispatch(listsettings())
      
      
    }, [dispatch])
  return (
    <>
      <section className='head'>
        <div className='container flex-all '>
          <div className='left  left-flex'>
              {settings.map((val) => (
                <div>
               <i className='fa fa-phone'></i>
                  <label> {val.phoneNumber}</label>
            </div>
              ))}
            <div>
            <i className='fa fa-envelope'></i>
              <label>info.baarqab@gmail.com</label>
              </div>
          </div>
         
           <div className='right row RText hide-right'>
            <label>Need Help?</label>
            <label>EN</label>
            <label>USD</label>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default Head
