import {
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_LIST_REQUEST2,
    PRODUCT_LIST_FAIL2,
    PRODUCT_LIST_SUCCESS2,PRODUCT_LIST_DISCOUNT_FAIL,
  PRODUCT_LIST_DISCOUNT_REQUEST,
  PRODUCT_LIST_DISCOUNT_SUCCESS,
    PRODUCT_LIST_ARRAVEL_REQUEST,
    PRODUCT_LIST_ARRAVEL_SUCCESS,
    PRODUCT_LIST_ARRAVEL_FAIL 
} from '../constants/productConstants' 

export const productListReducer = (state = { products: [ { category: [], subcategory: [] }] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
            }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const productArravelListReducer = (state = { products: [ { category: [], subcategory: [] }] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_ARRAVEL_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_ARRAVEL_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
            }
        case PRODUCT_LIST_ARRAVEL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const producDistListReducer = (state = { products: [ { category: [], subcategory: [] }] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_DISCOUNT_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_DISCOUNT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
            }
        case PRODUCT_LIST_DISCOUNT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productListReducerCount = (state = { counter: {} }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST2:
            return { loading: true, counter: {} }
        case PRODUCT_LIST_SUCCESS2:
            return {
                loading: false,
                counter: action.payload,
            }
        case PRODUCT_LIST_FAIL2:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productListReducer2 = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
            }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: { reviews: [],  category: [], subcategory: [] , images: [], colors: [], sizes: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: 
            return { loading: true, ...state} 
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {} , action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true}
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false,  success: true}
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productCreateReducer = (state = {} , action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true}
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: {} } , action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true}
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload}
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const productReviewReducer = (state = { } , action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true}
        case PRODUCT_CREATE_REVIEW_RESET:
            return { }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    } 
}

export const productTopReducer = (state = { products: [] } , action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: []}
        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}