import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import {Button, Checkbox, Form, Input, notification} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import './styles.less';
import {useDispatch} from 'react-redux';
import {userService} from "../../services";
import {authenticationAction} from "../../redux/actions";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const {userName, password} = values;
      const res = await userService.login(userName, password);
      dispatch(authenticationAction.loginSuccess(res));
      history.push('/my-order');
    } catch (error) {
      notification.error({
        message: 'Login',
        description: error
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
        initialValues={{remember: true}}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[{required: true, message: 'Please input your Username!'}]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{required: true, message: 'Please input your Password!'}]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon"/>}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
