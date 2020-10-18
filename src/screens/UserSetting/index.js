import React, {useEffect, useState} from "react";
import {Button, Form, Input, notification} from 'antd';
import {userService} from "../../services";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 8},
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
  },
};

const UserSetting = () => {
  const [isLoadingData, setLoadingData] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      const res = await userService.getProfile();
      const formValues = Object.keys(res).map(key => {
        return {
          name: key,
          value: res[key]
        }
      })
      setLoadingData(false);
      setProfile(formValues);
    }

    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      const payload = {
        fullName: values.fullName,
      };
      payload.password = values.password ? values.password : undefined;
      await userService.updateProfile(payload);
      notification.success({
        message: `Update Successfully`,
      })
    } catch (error) {
      notification.error({
        message: error,
      })
    }
  };

  return (
    <>
      <div className="page-header">
        <h2>User Setting</h2>
      </div>
      <Form {...layout}
            fields={profile}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}>
        <Form.Item name={'userId'} label="User Id">
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item name={'email'} label="Email" rules={[{type: 'email'}]}>
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item name={'fullName'} label="Full Name">
          <Input/>
        </Form.Item>
        <Form.Item name={'password'} label="Password">
          <Input type="password"/>
        </Form.Item>
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserSetting;
