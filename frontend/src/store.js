import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productArravelListReducer,producDistListReducer, productListReducer2, productTopReducer,productListReducerCount, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer,userReducerCount, userDetailsReducer,userDeleteReducer, userUpdateReducer, userListReducer, userUpdReducer } from './reducers/userReducers'
import {
    orderCreateReducer, orderDetailsReducer, orderPayReducer, orderReducerCount, orderMyListReducer,
    orderListReducer, orderDeliverReducer, orderPayReducer2
} from './reducers/orderReducers'
import { slideListReducer, slideDeleteReducer,slideCreateReducer,sildeDetailsReducer, slideUpdateReducer } from './reducers/slideReducers'

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
    packagesListReducer,
    packagesDeleteReducer,
    packagesDetailsReducer,
    packagesUpdateReducer,
    packagesCreateReducer
} from './reducers/packageReducers'

import {
    settingsListReducer,
    settingsDetailsReducer,
    settingsCreateReducer,
    settingsUpdateReducer
} from './reducers/settingsReducers'






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
    productList: productListReducer,
    productList2: productListReducer2,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview: productReviewReducer,
    productTop: productTopReducer,
    productLisCount: productListReducerCount,
    productArravelList: productArravelListReducer,
    producDistList: producDistListReducer,
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
    slideCreate: slideCreateReducer, 
    packagesList: packagesListReducer,
    packagesDelete: packagesDeleteReducer,
    packagesDetails: packagesDetailsReducer,
    packagesUpdate: packagesUpdateReducer,
    packagesCreate: packagesCreateReducer,
    settingsList:settingsListReducer,
    settingsDetails:settingsDetailsReducer,
    settingsUpdate:settingsUpdateReducer,
    settingsCreat:settingsCreateReducer,
    

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