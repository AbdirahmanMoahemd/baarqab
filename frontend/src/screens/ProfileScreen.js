import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../components/Loader.js'
import Message from '../components/Message.js'
import { getUserDetails } from '../actions/userActions'
import $ from 'jquery';
import { logout } from '../actions/userActions'
import { updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { mylistOrders } from '../actions/orderActions'
import Header from '../components/Header.js'



const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)



  
  

  


    const dispatch = useDispatch() 

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector((state) => state.userUpdate)
    const { success } = userUpdate

    const orderMyList = useSelector((state) => state.orderMyList)
    const { loading:loadingOrders, error:errorOrders, orders } = orderMyList


    useEffect(() => {
         
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(mylistOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
        
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
         if (password !== confirmpassword) {
            setMessage('Passwords do not match')
        }
        else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    const logoutHandler = () => {
        dispatch(logout())
         
    }

    var close = document.getElementsByClassName("closebtn");
    var i;

    for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 5000);
    }
    }
    

    return (
        <>
            <Header />
            <div className="all">
                <div className="in-all2"> 
                    <div className="form" >
                <div className="login-form profile-form" >
                    
                    <strong>User Profile</strong>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    {success && <Message variant='success'>Profile Updated</Message>}
                    <form onSubmit={submitHandler}>
                        <input type="name" value={name} placeholder="Name"
                            name="name" required
                            onChange={(e) => setName(e.target.value)}
                        /> 
                        <input type="email" value={email} placeholder="Exmaple@gmail.com"
                             name="email" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="password" value={password}
                            placeholder="password" name="password" required
                            onChange={(e)=> setPassword(e.target.value)}    
                        />
                        <input type="password" value={confirmpassword}
                            placeholder="confirm password" name="confirmpassword" required
                            onChange={(e)=> setConfirmPassword(e.target.value)}    
                        />
                                <button type="submit" value="">Update</button>
                                <button type="submit" value="" onClick={logoutHandler}>Logout</button>
                        
                    </form>
                   
                </div>
                <p className="wt"> .</p>
                <p className="wt"> .</p>
                        <p className="wt"> .</p>
                       

                
                
                            
                            
            </div>  
       
                </div>
                <div className="in-all">
                   
                    <div className="cart-page-pro">
                        <center> <strong>My Orders</strong></center>
                        {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> :
                        <>
                            <table>
                                <tbody> 
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th> 
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id.substring(0, 5)}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fa fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className='fa fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>
                                            Details
                                        </Link>
                                    </td>
                                        </tr>
                                 
                                   )) }
                                    
                                </tbody>
                            </table>
    
                        </>
                        }
                       
        
    </div>
                </div>
            </div>
        </>

    )
}

export default ProfileScreen
