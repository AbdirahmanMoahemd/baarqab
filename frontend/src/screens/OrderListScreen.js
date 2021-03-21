import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'
import AdminScreen from './AdminScreen'
import { Link } from 'react-router-dom'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  },[dispatch, history, userInfo])

    return (
       
             
        <>
            <AdminScreen/>
                 <div className="main-content">
           <main>
                   <>
                                <div className="recent-grid testi" >
                                    <div className="projects">
                                        <div className="card">
                                            <div className="card-header test-card-header">
                                                <h3>Orders</h3>
                                            </div>
                                            <div className="card-body">
                           {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                                <div className="table-responsive">
                                    <table>
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>USER</td>
                                            <td>DATE</td>
                                            <td>TOTAL</td>
                                            <td>PAID</td>
                                            <td>DELIVERED</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                               <td>{order._id.substring(15, )}</td>
                                                <td>{order.user && order.user.name}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>${order.totalPrice}</td>
                                                <td>
                                                {order.isPaid ? (
                                                    order.paidAt.substring(0, 10)
                                                ) : (
                                                    <i className='fa fa-times' style={{ color: 'red' }}></i>
                                                )}
                                                </td>
                                                <td>
                                                {order.isDelivered ? (
                                                    order.deliveredAt.substring(0, 10)
                                                ) : (
                                                    <i className='fa fa-times' style={{ color: 'red' }}></i>
                                                )}
                                                </td>
                                                <td>
                                                    <Link to={`/order/${order._id}`}> 
                                                        Details
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
                </div> 
               </div>
                    </>
                    </main>
             </div>    
                        
        </>
    
    )
}

export default OrderListScreen


{/* 
 

*/}