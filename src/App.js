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
import CreateOrderRealEstate from './screens/Order/RealEstate';
import CreateSpecificationOrder from './screens/Order/SpecificationOrder';
import MyOrder from './screens/Order/MyOrder';
import UserSetting from './screens/UserSetting';
import MasterData from './screens/Admin/MasterData';
import UserManagement from './screens/Admin/UserManagement';

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
        {/*ORDER*/}
        <AuthRoute path="/c-orders" type="private">
          <OrderChooser />
        </AuthRoute>
        <AuthRoute path="/co-general" type="private">
          <CreateGeneralOrder />
        </AuthRoute>
        <AuthRoute path="/co-re" type="private">
          <CreateOrderRealEstate />
        </AuthRoute>
        <AuthRoute path="/co-specification" type="private">
          <CreateSpecificationOrder />
        </AuthRoute>

        {/*END-co-general*/}
        <AuthRoute path="/update-order/:id" type="private">
          <CreateGeneralOrder />
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
        <AuthRoute path="/" type="private">
          <MyOrder />
        </AuthRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
