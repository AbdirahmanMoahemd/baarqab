import { CREATE_TESTIMONIAL_FAIL, CREATE_TESTIMONIAL_REQUEST, CREATE_TESTIMONIAL_RESET, CREATE_TESTIMONIAL_SUCCESS, TESTIMONIAL_DELETE_FAIL, TESTIMONIAL_DELETE_REQUEST, TESTIMONIAL_DELETE_SUCCESS, TESTIMONIAL_DETAILS_FAIL, TESTIMONIAL_DETAILS_REQUEST, TESTIMONIAL_DETAILS_RESET, TESTIMONIAL_DETAILS_SUCCESS, TESTIMONIAL_LIST_FAIL, TESTIMONIAL_LIST_REQUEST, TESTIMONIAL_LIST_SUCCESS, TESTIMONIAL_UPDATE_FAIL, TESTIMONIAL_UPDATE_REQUEST, TESTIMONIAL_UPDATE_RESET, TESTIMONIAL_UPDATE_SUCCESS } from '../constants/testimonialConstants'

export const TestimonialListReducer = (state = { testimonials: [] }, action) => {
    switch (action.type) {
        case TESTIMONIAL_LIST_REQUEST:
            return { loading: true, testimonials: [] }
        case TESTIMONIAL_LIST_SUCCESS:
            return {
                loading: false,
                testimonials: action.payload,
            }
        case TESTIMONIAL_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const testimonialDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TESTIMONIAL_DELETE_REQUEST:
            return { loading: true }
        case TESTIMONIAL_DELETE_SUCCESS:
            return { loading: false, success: true }
        case TESTIMONIAL_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }

}

export const testimonialRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TESTIMONIAL_REQUEST:
      return { loading: true }
    case CREATE_TESTIMONIAL_SUCCESS:
      return { loading: false,success: true, testimonials: action.payload }
    case CREATE_TESTIMONIAL_FAIL:
        return { loading: false, error: action.payload }
    case CREATE_TESTIMONIAL_RESET:
            return {}  
    default:
      return state
  }
}


export const testimonialDetailsReducer = (state = { testimonials: {} }, action) => {
  switch (action.type) {
    case TESTIMONIAL_DETAILS_REQUEST:
      return { ...state, loading: true }
    case TESTIMONIAL_DETAILS_SUCCESS:
      return { loading: false, testimonials: action.payload }
    case TESTIMONIAL_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case TESTIMONIAL_DETAILS_RESET:
      return { testimonials: {} }
    default:
      return state
  }
}


export const testimonialUpdateReducer = (state = { testimonial: {} } , action) => {
    switch (action.type) {
        case TESTIMONIAL_UPDATE_REQUEST:
            return { loading: true}
        case TESTIMONIAL_UPDATE_SUCCESS:
            return { loading: false, success: true, testimonial: action.payload}
        case TESTIMONIAL_UPDATE_RESET:
            return { testimonial: {} }
        case TESTIMONIAL_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}