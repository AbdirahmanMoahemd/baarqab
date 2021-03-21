import axios from "axios"
import { CREATE_TESTIMONIAL_FAIL, CREATE_TESTIMONIAL_REQUEST, CREATE_TESTIMONIAL_SUCCESS, TESTIMONIAL_DELETE_FAIL, TESTIMONIAL_DELETE_REQUEST, TESTIMONIAL_DELETE_SUCCESS, TESTIMONIAL_DETAILS_FAIL, TESTIMONIAL_DETAILS_REQUEST, TESTIMONIAL_DETAILS_SUCCESS, TESTIMONIAL_LIST_FAIL, TESTIMONIAL_LIST_REQUEST, TESTIMONIAL_LIST_SUCCESS, TESTIMONIAL_UPDATE_FAIL, TESTIMONIAL_UPDATE_REQUEST, TESTIMONIAL_UPDATE_SUCCESS } from "../constants/testimonialConstants"


export const listTestimonials = () => async (dispatch) => {
    try {
        dispatch({ type: TESTIMONIAL_LIST_REQUEST })

        const { data } = await axios.get('/api/testimonials')

        dispatch({
            type: TESTIMONIAL_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TESTIMONIAL_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
       })  
    }
}

export const deleteTestimonial = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TESTIMONIAL_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
      }, 
    }

    await axios.delete(`/api/testimonials/${id}`, config)

    dispatch({
      type: TESTIMONIAL_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: TESTIMONIAL_DELETE_FAIL,
        payload:
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message,
    })
  }
}

export const createTestimonial = () => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CREATE_TESTIMONIAL_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    }

      const { data } = await axios.post(`/api/testimonials`, {}, config)

    dispatch({
        type: CREATE_TESTIMONIAL_SUCCESS,
        payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_TESTIMONIAL_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


export const getTestimonialDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TESTIMONIAL_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/testimonials/${id}`, config)

    dispatch({
      type: TESTIMONIAL_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TESTIMONIAL_DETAILS_FAIL,
        payload:
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message,
    })
  }
}
export const updateTestimonial = (testimonial) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TESTIMONIAL_UPDATE_REQUEST,
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

      const { data } = await axios.put(`/api/testimonials/${testimonial._id}`, testimonial, config)

    dispatch({
        type: TESTIMONIAL_UPDATE_SUCCESS,
        payload: data,
    })
  } catch (error) {
    dispatch({
      type: TESTIMONIAL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}


