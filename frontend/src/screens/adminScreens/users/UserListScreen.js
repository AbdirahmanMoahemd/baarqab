import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader  from '../../../components/Loader.js'
import Message from '../../../components/Message.js'
import { listUsers, deleteUser } from '../../../actions/userActions.js'
import AdminScreen from '../AdminScreen.js'
import { Card } from 'primereact/card';


const UserListScreen = ({ history }) => {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers()) 
        }
        else {
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo, successDelete]) 


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this user')) {
            dispatch(deleteUser(id))
        }
        
    }

    return (
        <>
            <AdminScreen />
        <div className="main-content">
           <main>
                   <>
                                 <Card title="Users" subTitle="List of all users">
                <div className="p-grid">
                    <div className="p-col-12">
                        
                    </div>
                </div>
                <div className ="p-grid">
                                <div className="p-col-12">
                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                                        <div className="table-responsive" style={{ overflowX: "auto" }}>
                                                <table className="table" >
                                                    <thead>
                                                        <tr> 
                                                            <td>ID</td> 
                                                            <td>NAME</td>
                                                            <td>EMAIL</td>
                                                            <td>ADMIN</td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                        {users.map(user => (
                                                            <tr key={user._id}>
                                                                <td className="txtName">{user._id.substring(15,)}</td>
                                                                <td className="txtName">{user.name}</td>
                                                                <td className="txtName"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                                                <td className="txtName">
                                                                    {user.isAdmin ? (<i className='fa fa-check' style={{ color: 'green' }}></i>) : (
                                                                        <i className='fa fa-times' style={{ color: 'red' }}>
                                                        
                                                                        </i>
                                                                    )}
                                                                </td>
                                                                <td className="txtName">
                                                                    <Link to={`/admin/user/${user._id}/edit`}>
                                                                        <i className='fa fa-edit'></i>
                                                                    </Link>
                                                                </td>
                                                                <td className="txtName">
                                                                    <button  onClick={() => deleteHandler(user._id)}><i className='fa fa-trash'></i></button>
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
                    
            </main>
      </div>
        </>
    )

    
}

export default UserListScreen
