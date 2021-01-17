import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { Button, Layout, Menu, Space, Dropdown } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

const getActiveMenu = (pathname) => {
  console.log(pathname);
  if (pathname.startsWith('/update-order')) {
    return '/my-order';
  } else {
    return pathname;
  }
};

const AccountMenu = (
  <Menu>
    <Menu.Item>My Profile</Menu.Item>
    <Menu.Item>Logout</Menu.Item>
  </Menu>
);

const AuthRoute = (props) => {
  const { loggedIn } = useSelector((state) => state.authentication);
  const [collapsed, setCollapsed] = useState(false);
  const { type, location } = props;
  if (!loggedIn && type === 'private') return <Redirect to="/login" />;
  else if (loggedIn && type === 'guest') return <Redirect to="/my-order" />;
  return type === 'private' ? (
    <Layout className="app">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getActiveMenu(location.pathname)]}
          defaultOpenKeys={['sub2']}
        >
          <Menu.Item key="/c-orders" icon={<FileOutlined />}>
            <NavLink activeClassName="selected" to="/c-orders">
              Create Order
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/my-order" icon={<UnorderedListOutlined />}>
            <NavLink activeClassName="selected" to="/my-order">
              My Order
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/template" icon={<ContainerOutlined />}>
            <NavLink activeClassName="selected" to="/template">
              Template
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/user-setting" icon={<UserOutlined />}>
            <NavLink activeClassName="selected" to="/user-setting">
              User Setting
            </NavLink>
          </Menu.Item>

          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Admin">
            <Menu.Item key="/m-user" icon={<ContainerOutlined />}>
              <NavLink activeClassName="selected" to="/m-user">
                User Management
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/m-data" icon={<ContainerOutlined />}>
              <NavLink activeClassName="selected" to="/m-data">
                Master Data
              </NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Space
            style={{ float: 'right', marginRight: '20px' }}
            align="baseline"
          >
            <Button icon={<BellOutlined />} />
            <Dropdown overlay={AccountMenu} placement="bottomCenter">
              <Button icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            display: 'inline-table',
            margin: '24px 16px',
            padding: 24,
            minHeight: '280',
          }}
        >
          <Route {...props} />
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Route {...props} />
  );
};
export default AuthRoute;
