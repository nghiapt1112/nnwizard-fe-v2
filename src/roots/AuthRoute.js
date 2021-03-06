import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { Button, Layout, Menu, Space, Dropdown, Popover } from 'antd';
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

import './styles.less';
import { userService } from '../services';
import { authenticationAction } from '../redux/actions';

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

const getActiveMenu = (pathname) => {
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

const Notification = (
  <div className="notification">
    <div className="notification-list">
      <div className="notification-item">
        <strong>Noti title</strong>
        <span>Noti content</span>
        <span className="notification-item__time">11:30 20/12/2020</span>
      </div>
      <div className="notification-item">
        <strong>Noti title</strong>
        <span>Noti content</span>
        <span className="notification-item__time">11:30 20/12/2020</span>
      </div>
    </div>
  </div>
);

const AuthRoute = (props) => {
  const dispatch = useDispatch();
  const { loggedIn, userInfo } = useSelector((state) => state.authentication);
  const [collapsed, setCollapsed] = useState(false);
  const isAdmin = userInfo && userInfo.roles.includes('ADMIN');
  const { type, location } = props;

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = await userService.getProfile();
      dispatch(authenticationAction.getUserInfoSuccess(userInfo));
    };
    loggedIn && fetchProfile();
  }, [location.pathname]);

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

          {isAdmin ? (
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
          ) : null}
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
            <Popover
              placement="leftBottom"
              title="Notification"
              content={Notification}
              trigger="click"
            >
              <Button icon={<BellOutlined />} />
            </Popover>
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
