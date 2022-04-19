import axios from 'axios'
import {
  PACKAGE_DELETE_FAIL, PACKAGE_DELETE_REQUEST, PACKAGE_DELETE_SUCCESS,
  PACKAGE_LIST_FAIL, PACKAGE_LIST_REQUEST, PACKAGE_LIST_SUCCESS,
  PACKAGE_UPDATE_FAIL, PACKAGE_UPDATE_RESET, PACKAGE_UPDATE_SUCCESS, PACKAGE_UPDATE_REQUEST,
  PACKAGE_DETAILS_FAIL, PACKAGE_DETAILS_SUCCESS, PACKAGE_DETAILS_REQUEST, PACKAGE_DETAILS_RESET, PACKAGE_CREATE_SUCCESS, PACKAGE_CREATE_REQUEST, PACKAGE_CREATE_FAIL
} from "../constants/packageConstants.js"



export const listPackages = () => async (dispatch) => {
    try {
        dispatch({ type: PACKAGE_LIST_REQUEST })

        const { data } = await axios.get('/api/packages')

        dispatch({
            type: PACKAGE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PACKAGE_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
       })  
    }
}


export const deletePackges = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PACKAGE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
      }, 
    }

    await axios.delete(`/api/packages/${id}`, config)

    dispatch({
      type: PACKAGE_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PACKAGE_DELETE_FAIL,
        payload:
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message,
    })
  }
}



export const getPackageDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PACKAGE_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/packages/${id}`, config)

    dispatch({
      type: PACKAGE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PACKAGE_DETAILS_FAIL,
        payload:
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message,
    })
  }
}
export const updatePackages = (packages) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PACKAGE_UPDATE_REQUEST,
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

      const { data } = await axios.put(`/api/packages/${packages._id}`, packages, config)

    dispatch({
        type: PACKAGE_UPDATE_SUCCESS,
        payload: data,
    })
  } catch (error) {
    dispatch({
      type: PACKAGE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}



export const createPackage = ( packageName, category,icon,isFeatured ) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PACKAGE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    }

      const { data } = await axios.post(`/api/packages`, { packageName, category,icon,isFeatured }, config)

    dispatch({
        type: PACKAGE_CREATE_SUCCESS,
        payload: data,
    })
  } catch (error) {
    dispatch({
      type: PACKAGE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


