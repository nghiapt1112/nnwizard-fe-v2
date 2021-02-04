import React from 'react';
import { Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ProfileMenu = ({ onMenuClicked }) => {
  return (
    <>
      <Menu onClick={onMenuClicked}>
        <Menu.Item key="m-drawer" icon={<PlusOutlined />}>
          Drawer
        </Menu.Item>
        <Menu.Item key="m-my-profile" icon={<PlusOutlined />}>
          My Profile
        </Menu.Item>
        <Menu.Item key="m-logout" icon={<PlusOutlined />}>
          Log out
        </Menu.Item>
      </Menu>
    </>
  );
};

export default ProfileMenu;
