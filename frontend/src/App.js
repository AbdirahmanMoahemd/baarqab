import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import './css/App.css';
import { useDispatch, useSelector } from 'react-redux'
import HomeScreen from './screens/shopScreens/HomeScreen';
import ProductScreen from './screens/shopScreens/ProductScreen';
import LoginScreen from './screens/shopScreens/LoginScreen';
import RegisterScreen from './screens/shopScreens/RegisterScreen';
import ProfileScreen from './screens/shopScreens/ProfileScreen';
import PlaceOrderScreen from './screens/shopScreens/PlaceOrderScreen';
import PaymentScreen from './screens/shopScreens/PaymentScreen';
import OrderScreen from './screens/shopScreens/OrderScreen';
import CartScreen from './screens/shopScreens/CartScreen';
import CategoryScreen from './screens/shopScreens/CategoryScreen';
import OrderListScreen from './screens/adminScreens/OrderListScreen';
import AboutUsScreen from './screens/shopScreens/AboutUsScreen';
import AllProductsScreen from './screens/shopScreens/AllProductsScreen';
import CheckoutScreen from './screens/shopScreens/checkoutScreen';
import SliderListScreen from './screens/adminScreens/SliderListScreen';
import SlidesEditScreen from './screens/adminScreens/SlidesEditScreen';
import SlideCreateScreen from './screens/adminScreens/SlideCreateScreen';


import AdminHome from './screens/adminScreens/AdminHome';
import ProductEditScreen from './screens/adminScreens/products/ProductEditScreen';
import ProductListScreen from './screens/adminScreens/products/ProductListScreen';
import ProductCreateScreen from './screens/adminScreens/products/ProductCreateScreen';
import CategoryListScreen from './screens/adminScreens/category/CategoryListScreen';
import CategoryCreateScreen from './screens/adminScreens/category/CategoryCreateScreen';
import CategoryEditScreen from './screens/adminScreens/category/CategoryEditScreen';
import SubCategoryListScreen from './screens/adminScreens/subcategory/SubCategoryListScreen';
import SubCategoryCreateScreen from './screens/adminScreens/subcategory/SubCategoryCreateScreen';
import SubCategoryEditScreen from './screens/adminScreens/subcategory/SubCategoryEditScreen';
import UserEditScreen from './screens/adminScreens/users/UserEditScreen'
import UserListScreen from './screens/adminScreens/users/UserListScreen'
import PackageListScreen from './screens/adminScreens/package/packageListScreen'
import PackageCreateScreen from './screens/adminScreens/package/packageCreateScreen'
import PackageEditScreen from './screens/adminScreens/package/packageEditScreen'
import SettingsListScreen from './screens/adminScreens/settings/SettingsListScreen'
import SettingsEditScreen from './screens/adminScreens/settings/SettingsEditScreen'
import SettingsCreateReducer from './screens/adminScreens/settings/SettingsCreateReducer'

import ScrollToTop from './components/ScrollToTop';


const App = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  return ( 
    <Router> 
      <Route path='/order/:id' component={OrderScreen} exact /> 
      <Route path='/placeorder' component={PlaceOrderScreen} exact />
      <Route path='/payment' component={PaymentScreen} exact />
      <Route path='/login' component={LoginScreen} exact />
      <Route path='/chechout' component={CheckoutScreen} exact />
      <Route path='/register' component={RegisterScreen} exact />
      <Route path='/profile' component={ProfileScreen} exact />
      <Route path='/about' component={AboutUsScreen} exact />
      <ScrollToTop>
      <Route path='/product/:id' component={ProductScreen} exact />
      </ScrollToTop>
      <Route path='/cart/:id?' component={CartScreen} exact />
      {userInfo && userInfo.isAdmin ? (
        <>
          <Route path='/admin/settings' component={SettingsListScreen} exact />
          <Route path='/admin/settings/:id/edit' component={SettingsEditScreen} exact />
          <Route path='/admin/settings/create/new' component={SettingsCreateReducer} exact />
          
          <Route path='/admin/packages/create/new' component={PackageCreateScreen} exact />
          <Route path='/admin/packages/:id/edit' component={PackageEditScreen} exact />
          <Route path='/admin/packages' component={PackageListScreen} exact />
          <Route path='/admin/slidelist' component={SliderListScreen} exact />
          <Route path='/admin/slide/create/new' component={SlideCreateScreen} exact />
          <Route path='/admin/slide/:id/edit' component={SlidesEditScreen} exact />
          <Route path='/admin' component={AdminHome} exact /> 
          <Route path='/admin/category' component={CategoryListScreen} exact /> 
          <Route path='/admin/category/create/new' component={CategoryCreateScreen} exact /> 
          <Route path='/admin/category/:id' component={CategoryEditScreen} exact /> 
          <Route path='/admin/subcategory' component={SubCategoryListScreen} exact /> 
          <Route path='/admin/subcategory/create/new' component={SubCategoryCreateScreen} exact /> 
          <Route path='/admin/subcategory/:id' component={SubCategoryEditScreen} exact /> 
          <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
          <Route path='/admin/product/create/new' component={ProductCreateScreen} exact />
          <Route path='/admin/product/:id' component={ProductEditScreen} exact />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/orderlist' component={OrderListScreen} exact />
          <Route path='/admin/userlist' component={UserListScreen} exact />
        </> 
      ) : ''} 
      <Route path='/page/:pageNumber' component={HomeScreen} exact />
      <Route path='/search/:keyword' component={AllProductsScreen} exact />
      <Route path='/products' component={AllProductsScreen} exact />
      <Route path='/category/:id' component={CategoryScreen} exact />
      <Route path='/products/:id' component={AllProductsScreen} exact />
     <ScrollToTop>
        <Route path='/' component={HomeScreen} exact /> 
      </ScrollToTop>
    </Router> 
  );
}  

export default App;
