import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const queryString = require('query-string');

let window;
const CognitoLogin = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let parsed = queryString.parse(props?.location?.search);
    let redirectTo = '';
    let customQuery = '';

    if (parsed && Object.keys(parsed)?.length > 0) {
      redirectTo = parsed?.redirect;
      delete parsed?.redirect;
      customQuery = queryString.stringify(parsed);
    }

    if (redirectTo && customQuery) {
      localStorage.setItem('login_redirect_base', JSON.stringify(redirectTo));
      localStorage.setItem(
        'login_redirect_query',
        JSON.stringify('?' + customQuery)
      );
    } else if (redirectTo) {
      localStorage.setItem('login_redirect_base', JSON.stringify(redirectTo));
    } else {
      localStorage.setItem('login_redirect_base', JSON.stringify(''));
      localStorage.setItem('login_redirect_query', JSON.stringify(''));
    }
  }, [props]);

  if (localStorage['token']) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <>
      <Button
        onClick={() => Auth.federatedSignIn()}
        className="gx-mt-2"
        size="small"
        type="primary"
        icon={<PlusOutlined />}
      >
        Login with cognito
      </Button>
    </>
  );
};
export default CognitoLogin;
