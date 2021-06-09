import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './helpers/store';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './config/aws-cognito/awsconfig.json';
import awsauth from './config/aws-cognito/awsauth.json';
Amplify.configure(awsconfig);
Auth.configure({ oauth: awsauth });
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
