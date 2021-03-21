import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createPromotions, deletePromotions, listPromotions } from '../actions/promotionActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { CREATE_PROMOTION_RESET } from '../constants/promotionConstants'
import AdminScreen from './AdminScreen'


const PromotionListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const promotionList = useSelector((state) => state.promotionList)
    const { loading, error, promotions } = promotionList
    

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    

    const promotionDelete = useSelector((state) => state.promotionDelete)
    const { success:successDelete } = promotionDelete
    
    const promotionRegister = useSelector((state) => state.promotionRegister)
    const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    promotions: createdPromotion,
    } = promotionRegister
  
    useEffect(() => {
    dispatch({ type: CREATE_PROMOTION_RESET })
        if (!userInfo || !userInfo.isAdmin){
        history.push('/login')
        }
    if (successCreate) {
      history.push(`/admin/promotions/${createdPromotion._id}/edit`)
    } 
    else {
        dispatch(listPromotions()) 
    }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdPromotion ])
    

    const createPromotionsHandler = () => {
        dispatch(createPromotions())
    }
    var today = new Date(),
    todydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this promotion')) {
            dispatch(deletePromotions(id)) 
        }
        
    }
    
    return (
        <>
            <AdminScreen />
        <div className="main-content">
           <main>
             
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : ( 
                <>
                            
                                <div className="recent-grid testi" >
                                    <div className="projects">
                                        <div className="card">
                                            <div className="card-header">
                                            <h3>Promotions</h3>
                                                <button className="btn-dash"onClick={createPromotionsHandler} ><i className="fa fa-plus"></i> Create Promotion</button>
                                            </div>
                                            <div className="card-body">
                                    
                                                <div className="table-responsive">
                                                    <table>
                                                        <thead>
                                                            <tr >
                                                                <td>NAME</td>
                                                                <td>IMAGE</td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </thead>
                                                    <tbody>
                                                        {promotions.map(promotion => ( 
                                                            <tr key={promotion._id}>
                                                                <td className="txtName">{promotion.name}</td>
                                                                <td className="txtName">{promotion.image}</td>
                                                                <td className="txtName">
                                                                    <Link to={`/admin/promotions/${promotion._id}/edit`}>
                                                                        <i className='fa fa-edit'></i>
                                                                    </Link>
                                                                </td>
                                                                <td className="txtName">
                                                                    <button  onClick={() => deleteHandler(promotion._id)}><i className='fa fa-trash'></i></button>
                                                                </td>
                                                            </tr>
                                                             ))}
                                                        </tbody>
                                                    </table>
                                   
                                                </div>
                                    
                        </div>
                                        </div>
                                    </div>
                                   
                                </div>
                           
                </>
                    )} 
            </main>
      </div>
        </>
    )
}

export default PromotionListScreen
