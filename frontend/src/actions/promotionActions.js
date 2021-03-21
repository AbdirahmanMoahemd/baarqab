import axios from "axios"
import { CREATE_PROMOTION_FAIL, CREATE_PROMOTION_REQUEST, CREATE_PROMOTION_SUCCESS, PROMOTION_DELETE_FAIL, PROMOTION_DELETE_REQUEST, PROMOTION_DELETE_SUCCESS, PROMOTION_DETAILS_FAIL, PROMOTION_DETAILS_REQUEST, PROMOTION_DETAILS_SUCCESS, PROMOTION_LIST_FAIL, PROMOTION_LIST_REQUEST, PROMOTION_LIST_SUCCESS, PROMOTION_UPDATE_FAIL, PROMOTION_UPDATE_REQUEST, PROMOTION_UPDATE_SUCCESS } from "../constants/promotionConstants"


export const listPromotions = () => async (dispatch) => {
    try {
        dispatch({ type: PROMOTION_LIST_REQUEST })

        const { data } = await axios.get('/api/promotions')

        dispatch({
            type: PROMOTION_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROMOTION_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
       })  
    }
}


export const deletePromotions = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
      }, 
    }

    await axios.delete(`/api/promotions/${id}`, config)

    dispatch({
      type: PROMOTION_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PROMOTION_DELETE_FAIL,
        payload:
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message,
    })
  }
}

export const createPromotions = () => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CREATE_PROMOTION_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    }

      const { data } = await axios.post(`/api/promotions`, {}, config)

    dispatch({
        type: CREATE_PROMOTION_SUCCESS,
        payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_PROMOTION_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


export const getPromotionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/promotions/${id}`, config)

    dispatch({
      type: PROMOTION_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROMOTION_DETAILS_FAIL,
        payload:
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message,
    })
  }
}
export const updatePromotion = (promotion) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PROMOTION_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
    headers: {
        'Content-Type': 'application/json',      
        Authorization: `Bearer ${userInfo.token}`
      },
    }

      const { data } = await axios.put(`/api/promotions/${promotion._id}`, promotion, config)

    dispatch({
        type: PROMOTION_UPDATE_SUCCESS,
        payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROMOTION_UPDATE_FAIL, 
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


