import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productListReducer2, productTopReducer,productListReducerCount, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer,userReducerCount, userDetailsReducer,userDeleteReducer, userUpdateReducer, userListReducer, userUpdReducer } from './reducers/userReducers'
import {
    orderCreateReducer, orderDetailsReducer, orderPayReducer, orderReducerCount, orderMyListReducer,
    orderListReducer, orderDeliverReducer, orderPayReducer2
} from './reducers/orderReducers'
import { slideListReducer, slideDeleteReducer, sildeDetailsReducer, slideUpdateReducer } from './reducers/slideReducers'
import { testimonialDeleteReducer, testimonialDetailsReducer, TestimonialListReducer, testimonialRegisterReducer, testimonialUpdateReducer } from './reducers/testimonialReducers.js'
import { promotionDeleteReducer, promotionDetailsReducer, promotionListReducer, promotionRegisterReducer, promotionUpdateReducer } from './reducers/promotionReducers.js'

import {
    categoryListReducer,
    categoryDetailsReducer,
    categoryCreateReducer,
    categoryDeleteReducer,
    categoryUpdateReducer
} from './reducers/categoryreducers'
import {
    subcategoryListReducer,
    subcategoryDetailsReducer,
    subcategoryCreateReducer,
    subcategoryDeleteReducer,
    subcategoryUpdateReducer
} from './reducers/subcategoryReducers'
import {
    colorListReducer ,
    colorDetailsReducer,
    colorDeleteReducer ,
    colorCreateReducer ,
    colorUpdateReducer 
} from './reducers/colorReducers'

import {
    sizeListReducer ,
    sizeDetailsReducer,
    sizeDeleteReducer ,
    sizeCreateReducer, 
    sizeUpdateReducer ,
} from './reducers/sizeReducers'



const reducer = combineReducers({
    categoryList: categoryListReducer,
    categoryDetails: categoryDetailsReducer,
    categoryCreate: categoryCreateReducer,
    categoryDelete: categoryDeleteReducer,
    categoryUpdate: categoryUpdateReducer,
    subcategoryList: subcategoryListReducer,
    subcategoryDetails: subcategoryDetailsReducer,
    subcategoryCreate: subcategoryCreateReducer,
    subcategoryDelete: subcategoryDeleteReducer,
    subcategoryUpdate: subcategoryUpdateReducer,
    colorList:  colorListReducer,
    colorDetails: colorDetailsReducer,
    colorDelete: colorDeleteReducer,
    colorCreate: colorCreateReducer,
    colorUpdate: colorUpdateReducer,
    sizeList: sizeListReducer ,
    sizeDetails: sizeDetailsReducer,
    sizeCreate: sizeCreateReducer ,
    sizeDelete: sizeDeleteReducer, 
    sizeUpdate: sizeUpdateReducer ,
    productList: productListReducer,
    productList2: productListReducer2,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview: productReviewReducer,
    productTop: productTopReducer,
    productLisCount: productListReducerCount,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer, 
    userDelete: userDeleteReducer,
    userUpd: userUpdReducer,
    userCount: userReducerCount,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderPay2: orderPayReducer2,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    orderCount: orderReducerCount,
    slideList: slideListReducer,
    slideDelete: slideDeleteReducer,
    sildeDetails: sildeDetailsReducer,
    slideUpdate: slideUpdateReducer,
    testimonialList: TestimonialListReducer,
    testimonialDelete: testimonialDeleteReducer,
    testimonialRegister: testimonialRegisterReducer,
    testimonialDetails: testimonialDetailsReducer,
    testimonialUpdate: testimonialUpdateReducer,
    promotionList: promotionListReducer,
    promotionDelete: promotionDeleteReducer,
    promotionRegister: promotionRegisterReducer,
    promotionDetails: promotionDetailsReducer,
    promotionUpdate: promotionUpdateReducer, 

})

const cartItemsFormStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFormStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippinAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}


const initialState = {

    cart: { cartItems: cartItemsFormStorage, shippingAddress: shippinAddressFromStorage, paymentMethod: paymentMethodFromStorage},
    userLogin: { userInfo: userInfoFormStorage },

} 


const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware))
)



export default store