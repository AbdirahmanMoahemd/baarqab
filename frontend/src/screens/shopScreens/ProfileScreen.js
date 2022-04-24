import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../../components/Loader.js'
import Message from '../../components/Message.js'
import { getUserDetails } from '../../actions/userActions'
import $ from 'jquery';
import { logout } from '../../actions/userActions'
import { updateUserProfile } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import { mylistOrders } from '../../actions/orderActions'
import Header from "../../common/header/Header"
import { Card } from 'primereact/card';
import whatsApplink from '../../common/whatsApplink'


const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [apartment, setApartment] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
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
                setPhone(user.phone)
                setStreet(user.street)
                setApartment(user.apartment)
                setZip(user.zip)
                setCity(user.city)
                setCountry(user.country)
            }
        }
        
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
         if (password !== confirmpassword) {
            setMessage('Passwords do not match')
        }
        else {
            dispatch(updateUserProfile({ id: user._id, name, email, password, phone, street, apartment, zip, city, country }))
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
            <div className="profile-screen">
                <div className="profile-screen-in-1"> 
                     <div className="form">
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
                            placeholder="password" name="password" 
                            onChange={(e)=> setPassword(e.target.value)}    
                        />
                        <input type="password" value={confirmpassword}
                            placeholder="confirm password" name="confirmpassword" 
                            onChange={(e)=> setConfirmPassword(e.target.value)}    
                                />
                        <input type="name" value={phone} placeholder="Phone number"
                            name="name" required
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input type="name" value={street} placeholder="Street"
                            name="name" required
                            onChange={(e) => setStreet(e.target.value)}
                        />
                        <input type="name" value={apartment} placeholder="Apartment"
                            name="name" required
                            onChange={(e) => setApartment(e.target.value)}
                        />
                        <input type="name" value={zip} placeholder="Zip code"
                            name="name" required
                            onChange={(e) => setZip(e.target.value)}
                                />
                        <input type="name" value={city} placeholder="City"
                            name="name" required
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input type="name" value={country} placeholder="Country"
                            name="name" required
                            onChange={(e) => setCountry(e.target.value)}
                        />        
                                <button type="submit" value="">Update</button>
                                <button type="submit" value="" onClick={logoutHandler}>Logout</button>
                        
                    </form>
                    <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                </div>
                    
            </div> 
                </div>
                <div className="profile-screen-in-2">
                    <Card title="Users" subTitle="List of all users">
                <div className="p-grid">
                    <div className="p-col-12">
                        
                    </div>
                </div>
                <div className ="p-grid">
                                <div className="p-col-12">
                            {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                                     <div className="table-responsive" style={{ overflowX: "auto" }}>
                                        <table className="table" >

                                     <thead>   
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th> 
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                    </thead>    
                                     <tbody> 
                                    {orders.map(order => (
                                        <tr key={order._id} >
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
                                    </div>
                                )}
                                </div>
                                </div>
                                </Card>
                   
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
           
        </>

    )
}

export default ProfileScreen



