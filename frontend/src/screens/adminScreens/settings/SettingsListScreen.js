import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listsettings } from '../../../actions/settingsActions'
import AdminScreen from '../AdminScreen'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

const SettingsListScreen = ({history}) => {
  
   const dispatch = useDispatch()

    
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const settingsList = useSelector(state => state.settingsList) 
    const { loading, error, settings } = settingsList

    
    
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login') 
        }
        dispatch(listsettings())
       
    }, [
        dispatch, history, userInfo])
    
     
     const leftContents = (
    <React.Fragment>
            <div >
                <Link to={'/admin/settings/create/new'}>
            <Button 
            label="New"
            className="p-button-success  p-mr-2"
            icon="pi pi-plus"
            ></Button>
                </Link>
            <Button 
            label="Refresh"
            className="p-button-primary"
            icon="pi pi-refresh"
            onClick={() => window.location.reload(false)}
            ></Button>
          </div> 
    </React.Fragment>
);
        return (
        <>
            <AdminScreen/>
            <p-toast></p-toast>

<div className="main-content">
        <main>
           <Card title="Settings" subTitle="List of all settings">
    <div className="p-grid">
      <div className="p-col-12">
     
         
      </div>
    </div>
    <div className ="p-grid">
                                <div className="p-col-12">
                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                             <div className="table-responsive " style={{overflowX:"auto"}}>
                                        <table className="table" >
                                    <thead>
                                        <tr>
                                            <td>serviceTitle1</td>
                                            <td>serviceTitle2</td>
                                            <td>serviceTitle3</td>
                                            <td>PhoneNumber</td>
                                            <td>About</td>
                                            <td>AboutImg</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {settings.map(setting => (
                                            <tr key={setting.id}>
                                               <td>{setting.serviceTitle1}</td>
                                               <td>{setting.serviceTitle2}</td>
                                               <td>{setting.serviceTitle3}</td>
                                               <td>{setting.phoneNumber}</td>
                                               <td>{setting.about}</td>
                                               <td><img style={{width: "100%"}} src={setting.aboutImg} /></td>
                                                <td>
                                              <Link to={`/admin/settings/${setting.id}/edit`}> 
                                            <Button 
                                            icon="pi pi-pencil"
                                                            className="p-button-success p-mr-2"
                                                           
                                                    ></Button>
                                                 </Link>  
                                                </td>
                                                
                                            </tr>
                                         ))}
                                    </tbody>
                                </table>         
                                        </div>
                                  )}        
      </div>
                              
    </div>
  </Card>
        </main>
    </div> 


        </>
    
    )

}

export default SettingsListScreen