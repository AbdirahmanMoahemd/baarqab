import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { getUserDetails, UpdUser } from '../../../actions/userActions.js'
import { USER_UPD_RESET } from '../../../constants/userConstants.js'
import AdminScreen from '../AdminScreen.js'


const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const dispatch = useDispatch() 

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpd = useSelector(state => state.userUpd)
    const { loading:loadingUpd, error:errorUpd, success:successUpd } = userUpd


    useEffect(() => {
        if (successUpd) {
            dispatch({ type: USER_UPD_RESET })
            history.push('/admin/userlist')
        }
        else {
            if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        }
        else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
        }
        
    }, [dispatch, history , userId, user, successUpd ])  

    const submitHandler = (e)  => {
        e.preventDefault()
        // DISPACTH REGISTER
        dispatch(UpdUser({ _id: userId, name, email, isAdmin}))
    }
    return (
        <>
            <AdminScreen />
            <div className="login-page-mt">
            <div className="main-content userlists">
            
                <div className="form">
                <div className="login-form">
                   
                    <strong>Edit User</strong>
                    {loadingUpd && <Loader />}
                    {errorUpd && <Message>{errorUpd}</Message>}
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                            <form onSubmit={submitHandler}>
                                <input type="text" value={name} placeholder="name"
                                    name="name" required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input type="email" value={email}
                                    placeholder="Exmaple@gmail.com" name="email" required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label for="scales">Is Admin</label>
                                <input type="text" value={isAdmin}
                                     name="isAdmin" required
                                    onChange={(e) => setIsAdmin(e.target.value)}
                                />
                               
                                <button type="submit" value="" >Update</button>
                            </form> 
                        )} 
                </div>

                
                    
            </div>  
       
                </div>
                </div>
        </>
    )
}

export default UserEditScreen
