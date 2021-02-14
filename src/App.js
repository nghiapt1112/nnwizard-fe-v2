import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './styles/index.less';
import './App.less';
import AuthRoute from './roots/AuthRoute';
import Login from './screens/Outside/Login';
import Register from './screens/Outside/Register';

import OrderChooser from './screens/Order/OrderChooser';
import Template from './screens/Template';
import CreateGeneralOrder from './screens/Order/GeneralOrder';
import CreateSpecificationOrder from './screens/Order/SpecificationOrder';
import MyOrder from './screens/Order/MyOrder';
import UserSetting from './screens/UserSetting';
import MasterData from './screens/Admin/MasterData';
import UserManagement from './screens/Admin/UserManagement';
import DashBoard from './screens/DashBoard';
import Checkout from './screens/Order/Checkout';
import OrderReview from './screens/Order/OrderReview';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/login" type="guest">
          <Login />
        </AuthRoute>
        <AuthRoute path="/register" type="guest">
          <Register />
        </AuthRoute>
        <AuthRoute path="/my-order" type="private">
          <MyOrder />
        </AuthRoute>
        <AuthRoute path="/template" type="private">
          <Template />
        </AuthRoute>
        {/*Dash Board*/}
        <AuthRoute path="/dashboard" type="private">
          <DashBoard />
        </AuthRoute>
        {/*ORDER*/}
        <AuthRoute path="/c-orders" type="private">
          <OrderChooser />
        </AuthRoute>
        <AuthRoute path="/co-general" type="private">
          <CreateGeneralOrder />
        </AuthRoute>
        <AuthRoute path="/co-specification" type="private">
          <CreateSpecificationOrder />
        </AuthRoute>
        {/*END-co-general*/}
        <AuthRoute path="/update-order/:id" type="private">
          <CreateSpecificationOrder />
        </AuthRoute>
        <AuthRoute path="/user-setting" type="private">
          <UserSetting />
        </AuthRoute>
        <AuthRoute path="/m-data" type="private">
          <MasterData />
        </AuthRoute>
        <AuthRoute path="/m-user" type="private">
          <UserManagement />
        </AuthRoute>
        <AuthRoute path="/checkout" type="private">
          <Checkout />
        </AuthRoute>
        <AuthRoute path="/order-review" type="private">
          <OrderReview />
        </AuthRoute>
        <AuthRoute path="/" type="private">
          <MyOrder />
        </AuthRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
