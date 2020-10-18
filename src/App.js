import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/index.less';
import './App.less';
import AuthRoute from "./roots/AuthRoute";
import Login from "./screens/Outside/Login";
import Register from "./screens/Outside/Register";

import Template from "./screens/Template";
import CreateOrder from "./screens/CreateOrder";
import MyOrder from "./screens/MyOrder";
import UserSetting from "./screens/UserSetting";
import Index from "./screens/Index";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index}/>
        <AuthRoute path="/login" type="guest">
          <Login/>
        </AuthRoute>
        <AuthRoute path="/register" type="guest">
          <Register/>
        </AuthRoute>
        <AuthRoute path="/my-order" type="private">
          <MyOrder/>
        </AuthRoute>
        <AuthRoute path="/template" type="private">
          <Template/>
        </AuthRoute>
        <AuthRoute path="/create-order" type="private">
          <CreateOrder/>
        </AuthRoute>
        <AuthRoute path="/user-setting" type="private">
          <UserSetting/>
        </AuthRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
