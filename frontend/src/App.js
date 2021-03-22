import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import ElectronicsScreen from './screens/ElectronicsScreen';
import ShoesScreen from './screens/ShoesScreen';
import HerbalScreen from './screens/HerbalScreen';
import CartScreen from './screens/CartScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductListScreen from './screens/ProductListScreen';
import AdminHome from './screens/AdminHome';
import AboutUsScreen from './screens/AboutUsScreen';
import CosmaticsScreen from './screens/CosmaticsScreen';
import TestimonialListScreen from './screens/TestimonialListScreen';
import PromotionListScreen from './screens/PromotionListScreen';
import SlidesEditScreen from './screens/SlidesEditScreen';
import TestimonialEditScreen from './screens/TestimonialEditScreen';
import PromotionEditScreen from './screens/PromotionEditScreen';
import SliderListScreen from './screens/SliderListScreen';
import AlaabScreen from './screens/AlaabScreen';
import UserListScreen from './screens/UserListScreen';
import AllProductsScreen from './screens/AllProductsScreen';
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
      <Route path='/shipping' component={ShippingScreen} exact />
      <Route path='/register' component={RegisterScreen} exact />
      <Route path='/profile' component={ProfileScreen} exact />
      <Route path='/contact' component={AboutUsScreen} exact />
      <ScrollToTop>
      <Route path='/product/:id' component={ProductScreen} exact />
      </ScrollToTop>
      <Route path='/cosmetics' component={CosmaticsScreen} exact />
      <Route path='/herbal' component={HerbalScreen} exact />
      <Route path='/shoes' component={ShoesScreen} exact />  
      <Route path='/dhar' component={ProductsScreen} exact />
      <Route path='/Alaabta_Guryaha' component={AlaabScreen} exact />
      <Route path='/electronics' component={ElectronicsScreen} exact />
      <Route path='/cart/:id?' component={CartScreen} exact />
      {userInfo && userInfo.isAdmin ? (
        <>
          <Route path='/admin' component={AdminHome} exact /> 
          <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact />
          <Route path='/admin/testimonials/:id/edit' component={TestimonialEditScreen} exact />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/orderlist' component={OrderListScreen} exact />
          <Route path='/admin/userlist' component={UserListScreen} exact />
          <Route path='/admin/testimoniallist' component={TestimonialListScreen} exact />
          <Route path='/admin/slidelist' component={SliderListScreen} exact />
          <Route path='/admin/slides/:id/edit' component={SlidesEditScreen} exact /> 
          <Route path='/admin/promotionlist' component={PromotionListScreen} exact /> 
          <Route path='/admin/promotions/:id/edit' component={PromotionEditScreen} exact /> 
        </>
      ) : ''} 
      <Route path='/page/:pageNumber' component={HomeScreen} exact />
      <Route path='/search/:keyword' component={AllProductsScreen} exact />
      <Route path='/' component={HomeScreen} exact /> 
    </Router> 
  );
}  

export default App;
