import { CREATE_PROMOTION_FAIL, CREATE_PROMOTION_REQUEST, CREATE_PROMOTION_RESET, CREATE_PROMOTION_SUCCESS, PROMOTION_DELETE_FAIL, PROMOTION_DELETE_REQUEST, PROMOTION_DELETE_SUCCESS, PROMOTION_DETAILS_FAIL, PROMOTION_DETAILS_REQUEST, PROMOTION_DETAILS_RESET, PROMOTION_DETAILS_SUCCESS, PROMOTION_LIST_FAIL, PROMOTION_LIST_REQUEST, PROMOTION_LIST_SUCCESS, PROMOTION_UPDATE_FAIL, PROMOTION_UPDATE_REQUEST, PROMOTION_UPDATE_RESET, PROMOTION_UPDATE_SUCCESS } from "../constants/promotionConstants"

export const promotionListReducer = (state = { promotions: [] }, action) => {
    switch (action.type) {
        case PROMOTION_LIST_REQUEST:
            return { loading: true, promotions: [] }
        case PROMOTION_LIST_SUCCESS:
            return {
                loading: false,
                promotions: action.payload,
            }
        case PROMOTION_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const promotionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PROMOTION_DELETE_REQUEST:
            return { loading: true }
        case PROMOTION_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PROMOTION_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }

}

export const promotionRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROMOTION_REQUEST:
      return { loading: true }
    case CREATE_PROMOTION_SUCCESS:
      return { loading: false,success: true, promotions: action.payload }
    case CREATE_PROMOTION_FAIL:
        return { loading: false, error: action.payload }
    case CREATE_PROMOTION_RESET:
            return {}  
    default: 
      return state
  }
}


export const promotionDetailsReducer = (state = { promotion: {} }, action) => {
  switch (action.type) {
    case PROMOTION_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PROMOTION_DETAILS_SUCCESS:
      return { loading: false, promotion: action.payload }
    case PROMOTION_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PROMOTION_DETAILS_RESET:
      return { testimonials: {} }
    default:
      return state
  }
}


export const promotionUpdateReducer = (state = { promotion: {} } , action) => {
    switch (action.type) {
        case PROMOTION_UPDATE_REQUEST:
            return { loading: true}
        case PROMOTION_UPDATE_SUCCESS:
            return { loading: false, success: true, promotion: action.payload}
        case PROMOTION_UPDATE_RESET:
            return { promotion: {} }
        case PROMOTION_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}