/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import {Button, Form, Input, notification} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import './styles.less';
import {useDispatch} from "react-redux";
import {authenticationAction} from "../../redux/actions";
import {userService} from "../../services";
import {useHistory} from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(authenticationAction.logout());
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const {email, password} = values;
      await userService.register(email, password);
      history.push('/login');
      notification.success({
        message: 'Register successfully'
      })
    } catch (error) {
      const {response: {data, statusText}} = error;
      const erMessage = ((data && data.message) || (data.messages && data.messages[0])) || statusText;
      notification.error({
        message: 'Register',
        description: erMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{required: true, message: 'Please input your Email!'}]}
        >
          <Input
            autoComplete="off"
            prefix={<UserOutlined className="site-form-item-icon"/>}
            placeholder="Email"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{required: true, message: 'Please input your Password!'}]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon"/>}
            type="password"
            autoComplete="new-password"
            placeholder="Password"
          />
        </Form.Item>
        {/*<Form.Item*/}
        {/*  name="passwordConfirm"*/}
        {/*  rules={[{required: true, message: 'Please input your Confirm Password!'}]}*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    prefix={<LockOutlined className="site-form-item-icon"/>}*/}
        {/*    type="password"*/}
        {/*    placeholder="Confirm Password"*/}
        {/*  />*/}
        {/*</Form.Item>*/}
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
          You might already have an account, Please <a href="/login">login</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
