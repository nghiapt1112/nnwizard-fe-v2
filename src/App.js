import React, { useEffect } from 'react';
import { BrowserRouter, Switch, useHistory } from 'react-router-dom';
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
import CognitoLogin from './screens/Outside/CognitoLogin';
import awsconfig from './config/aws-cognito/awsconfig.json';
import awsauth from './config/aws-cognito/awsauth.json';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { authenticationAction } from './redux/actions';
import LocalStorageService from './services/LocalStorageService';
import { userService } from './services';
const localStorageService = LocalStorageService.getService();

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log('event:', event);
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          // setToken('grating...');
          // getToken().then((userToken) => setToken(userToken.idToken.jwtToken));
          console.log('sign in');
          break;
        case 'signOut':
          // setToken(null);
          console.log('sign out');
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('currentAuthenticatedUser', user);
        Auth.currentSession().then((res) => {
          let accessToken = res.getAccessToken();
          let jwt = accessToken.getJwtToken();
          let refreshToken = res.getRefreshToken().getToken();
          // console.log(refreshToken);
          console.log(res);
          // console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
          // console.log(`myJwt: ${jwt}`);
          localStorageService.setToken({
            access_token: jwt,
            refresh_token: refreshToken,
          });
          dispatch(authenticationAction.loginSuccess());
          const userInfo = userService.getProfile();
          console.log(`userInfo: ${userInfo}`);
          dispatch(
            authenticationAction.getUserInfoSuccess({ username: 'ptnghia1' })
          );

          // sessionStorage.setItem(
          //   ACCESS_TOKEN_EXPIRY,
          //   (accessToken.payload.exp * 1000).toString()
          // );
          // sessionStorage.setItem(ACCESS_TOKEN, jwt);
          // sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
          // setLoggedInUser(jwt);
          // setIsToken(true);
        });
      })
      .catch((error) => {
        console.log('Not signed in');
        console.log(error);
        // setIsToken(true);
      });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/login" type="guest">
          <CognitoLogin />
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
