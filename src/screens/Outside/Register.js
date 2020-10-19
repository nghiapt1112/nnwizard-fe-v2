/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import './styles.less';
import {useDispatch} from "react-redux";
import {authenticationAction} from "../../redux/actions";

const Register = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticationAction.logout());
  }, []);

  const onFinish = values => {
    // const {email, password} = values;
    // dispatch(authenticationAction.register(email, password));
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
          You might already have an account, Please <a href="/login">login</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
