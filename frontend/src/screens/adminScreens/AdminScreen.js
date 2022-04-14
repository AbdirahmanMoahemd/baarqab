import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'



const AdminScreen = ({ history }) => {
    const dispatch = useDispatch() 
    const userLogin = useSelector(state => state.userLogin)
     const { userInfo } = userLogin
    const logoutHandler = () => {
        if (window.confirm('Are you sure to logout ')) {
            dispatch(logout())
        }
        
         
    }

    return (
        <>
          <input type="checkbox" id="nav-toggle"/>
    <div className="sidebar">
        <div className="sidebar-brands">
            <h2><span className="lab la-accusoft"></span><span><Link to="/" style={{color: '#fff'}}>Home</Link></span></h2>
        </div>
        <div className="sidebar-menu">
            <ul>
                <li>
                    <Link to="/admin" className="active-admin"><span className="las la-igloo"></span>
                        <span >Dashboard</span>
                    </Link> 
                </li>
                <li>
                    <Link to="/admin/category"><span className="lab la-cuttlefish"></span>
                        <span>Category</span>
                    </Link> 
                </li>        
                <li>
                    <Link to="/admin/subcategory"><span className="lab la-cuttlefish"></span>
                        <span>Sub Category</span>
                    </Link> 
                </li>  
                <li>
                    <Link to="/admin/productlist"><span className="las la-shopping-bag"></span>
                        <span>Products</span>
                    </Link>
                        </li>
                <li>
                    <Link to="/admin/slidelist"><span className="las la-sliders-h"></span>
                        <span>Slider</span>
                    </Link>
                        </li>
                  <li>
                    <Link to="/admin/packages"><span className="las la-box-open"></span>
                        <span>Packages</span>
                    </Link>
                        </li>
                              
                <li>
                    <Link to="/admin/orderlist"><span className="las la-receipt"></span>
                        <span>Orders</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/userlist"><span className="las la-users"></span>
                        <span>Users</span>
                    </Link> 
                </li>        
                <li>
                    <Link to="/admin" onClick={logoutHandler}><span ><i className="fa fa-sign-out"></i></span>
                        <span>Logout</span>
                    </Link>
                </li>
               
            </ul>
        </div>
    </div>
    <div className="main-content">
        <header>
            <h2>
                <label htmlFor="nav-toggle">
                    <span className="las la-bars"></span>
                </label>
                <span>Dashboard</span>
            </h2>
            {/* <!-- <div className="search-wrapper">
                <span className="las la-search"></span>
                <input type="search" placeholder="Search here">
            </div> --> */}
            <div className="user-wrapper">
                <div>
                    <h4>{userInfo.name}</h4>
                </div>
            </div>
        </header>
       
            </div>  
        </>
    )
}

export default AdminScreen
