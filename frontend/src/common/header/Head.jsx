import React, { useRef, useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { listsettings } from '../../actions/settingsActions.js'

const Head = () => {
  const dispatch = useDispatch()
  
  const settingsList = useSelector(state => state.settingsList) 
    const { loading, error, settings } = settingsList

    useEffect(() => {
       
        dispatch(listsettings())
       
    }, [
      dispatch])
  
  var newdata = []
  settings.map((val) => {
    newdata = [
    {
      phone: val.phoneNumber,
      },
      {
      phone: val.phoneNumber,
    },
    
  ]
  })
  return (
    <>
      <section className='head'>
        <div className='container flex-all '>
          <div className='left  left-flex'>
              {newdata.map((val) => {
                <div key={val.id}>
               <i className='fa fa-phone'></i>
                  <label> {val.phone}</label>
            </div>
            })} 
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
