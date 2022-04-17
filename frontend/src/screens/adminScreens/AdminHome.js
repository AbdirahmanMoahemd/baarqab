import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders, listOrders2, listOrdersCount } from '../../actions/orderActions'
import { listProductsCount } from '../../actions/productAction'
import { listUsersCount } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import AdminScreen from './AdminScreen'
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';


const AdminHome = ({ history }) => {
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList
    
    
    
    
   

    const productLisCount = useSelector((state) => state.productLisCount)
    const { counter:counterProduct } = productLisCount
    
    const userCount = useSelector((state) => state.userCount)
    const { counter:usercount } = userCount
    
    const orderCount = useSelector((state) => state.orderCount)
    const { counter:ordercount } = orderCount

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    

  
    useEffect(() => {
      
    if (userInfo && userInfo.isAdmin) {
        dispatch(listOrders())
        dispatch(listProductsCount())
        dispatch(listOrdersCount())
        dispatch(listUsersCount())
    } else {
      history.push('/login')
    }
  },[dispatch, history, userInfo])
    var today = new Date(),
    todydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   const leftContents = (
    <React.Fragment>
            <div >
                <Link to={'/admin/orderlist'}>
            <Button 
            icon="pi pi-angle-double-right"
            label="See all"
            className="p-button-success  p-mr-2"
            
            ></Button>
                </Link>
          </div> 
    </React.Fragment>
);
    
    return (
        <>
            <AdminScreen />
        <div className="main-content">
           <main>
            <div className="cards">
                <div className="card-single">
                            <div>
                                {usercount.counter3 === 1 ? (
                                    <> 
                                        <h1>{usercount.counter3}</h1>
                                    <span>Customer</span>
                                   </>
                                 ) :
                                <>
                                        <h1>{usercount.counter3}</h1>
                                    <span>Customers</span>
                                   </>
                                } 
                        
                    </div>
                    <div>
                        <span className="las la-users"></span>
                    </div>
                </div>
                <div className="card-single">
                    <div>
                        <h1 >{counterProduct.counter}</h1>
                        <span>Products</span>
                    </div>
                    <div>
                        <span className="las la-shopping-bag"></span>
                    </div>
                </div>
                <div className="card-single">
                            <div>
                                <h1>{ordercount.counter2}</h1>
                                <span>orders</span>
                             </div>
                    <div>
                        <span className="las la-receipt"></span>
                    </div>
                </div>
                
                <div className="card-single">
                    <div>
                        <h1>${ordercount.real2}</h1>
                                <span>Revenue(${ordercount.real})</span>
                    </div>
                    <div>
                        <span className="lab la-google-wallet"></span>
                    </div>
                </div>
                    </div>
                    <br></br>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                       <Card title="Recent Orders" subTitle="List of all Recent Orders">
    <div className="p-grid">
      <div className="p-col-12">
        <Toolbar right={leftContents}/>
         
      </div>
    </div>
    <div className ="p-grid">
                                <div className="p-col-12">
                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                             <div className="table-responsive " style={{overflowX:"auto"}}>
                                        <table className="table" >
                                    <thead>
                                        <tr>
                                            <td>NAME</td>
                                                                 <td>PAID</td>
                                                                 <td>DELIVERED</td>
                                                                <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {orders.filter(order => order.date === todydate).map(order => (
                                            <tr key={order.id}>
                                               <td>{order.user && order.user.name}</td>
                                               <td>{order.isPaid ? (
                                                   order.paidAt.substring(0, 10)
                                               ) : (
                                                   <i className='fa fa-times' style={{ color: 'red' }}></i>
                                               )}</td>
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
  </Card>      
                </>
                    )}
            </main>
            </div>  
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </>
    )
}

export default AdminHome



//  <div className="recent-grid" >
//                                     <div className="projects">
//                                     <div className="card">

                                            

//                                             <div className="card-header">
//                                                 <h3>Recent Orders</h3>
//                                                 <button className="btn-dash" ><Link to={'/admin/orderlist'} style={{color: '#fff'}}> See all</Link><span className="las la-arrow-right"></span></button>
//                                             </div>
//                                             <div className="card-body">
                                    
//                                                 <div className="table-responsive">
//                                                     <table>
//                                                         <thead>
//                                                             <tr>
//                                                                 <td>NAME</td>
//                                                                 <td>PAID</td>
//                                                                 <td>DELIVERED</td>
//                                                                 <td></td>
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
                                                    
                                            
//                                             {orders.filter(order => order.date === todydate).map(order => (
//                                                             <tr key={order._id}>
                                                      
//                                                                 <td>{order.user && order.user.name}</td>
//                                                                 <td>
//                                                                     {order.isPaid ? (
//                                                                         order.paidAt.substring(0, 10)
//                                                                     ) : (
//                                                                         <i className='fa fa-times' style={{ color: 'red' }}></i>
//                                                                     )}
//                                                                 </td>
//                                                                 <td>
//                                                                     {order.isDelivered ? (
//                                                                         order.deliveredAt.substring(0, 10)
//                                                                     ) : (
//                                                                         <i className='fa fa-times' style={{ color: 'red' }}></i>
//                                                                     )}
//                                                                 </td>
//                                                                 <td>
//                                                                     <Link to={`/order/${order._id}`}>
//                                                                         Details
//                                                     </Link>
//                                                                 </td>
                                                 
//                                                             </tr>
//                                          ))}
//                                                         </tbody>
//                                                     </table>
                                   
//                                                 </div>
                                    
//                         </div>
//                                         </div>
//                                     </div>
                                    {/* <div className="customers">
                                    <div className="card">
                                       
                                            <div className="card-header">
                                                <h3>New Customers</h3>
                                                <button className="btn-dash" ><Link to={`/orderlist`} style={{color: '#fff'}}> See all</Link><span className="las la-arrow-right"></span></button>
                                            </div>
                                            <div className="card-body">
                                            <div className="table-responsive">
                                                {orders.filter(order => order.date === todydate).map(order => (
                                                    <div className="customer">
                                                   
                                                        <>
                                                
                                                            <div className="info">
                                                            
                                                                <div key={order._id}>
                                                                    <h4>{order.user && order.user.name}</h4>
                                                                    <small>{order.shippingAddress.phoneNumber}</small>
                                                            </div>
                                                            
                                                            </div>
                                                            <div className="contact">
                                                                <div>
                                                                    <span className="las la-user-circle"></span>
                                                                    <span className="las la-comment"></span>
                                                                    <span className="las la-phone"></span>
                                                                </div>
                                                            </div>
                                                        </>
                                                    
                                                    </div>
                                 
                                ))}
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </div> */}
           