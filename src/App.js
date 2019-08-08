import React, { useState } from 'react';
import './styles/app.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-input-range/lib/css/index.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Category from './components/categories/Category';
import ViewProduct from './components/products/ViewProduct';
import CartProducts from './components/cart/CartProducts';
import Checkout from './components/checkout/Checkout';
import PrivateRoute from './components/routing/PrivateRoute';
import UserState from './context/user/UserState';
import CartState from './context/cart/CartState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import setToken from './helpers/setUserToken';
import MyAccount from './components/user/MyAccount';

setToken(localStorage.usertoken);

let App = () => {
  let [showCart, setShowCart] = useState(false);
  let shoCartModal = () => {
    setShowCart(true);

    // For dom animations else way I can pass showCart var to CartProducts component
    setTimeout(
      () => document.querySelector('.cart .modal').classList.add('show'),
      1
    );
  };
  return (
    <UserState>
      <CartState>
        <Router>
          <div className="wrapper">
            {showCart && <CartProducts closeModal={setShowCart} />}
            <Header showCart={shoCartModal} />
            <Switch>
              <Route exact path="/product/:id" component={ViewProduct} />
              <PrivateRoute exact path="/checkout" component={Checkout} />
              <PrivateRoute exact path="/my" component={MyAccount} />
              <Route exact path="/:page?/:id?" component={Category} />
            </Switch>
            <Footer />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </CartState>
    </UserState>
  );
};

export default App;
