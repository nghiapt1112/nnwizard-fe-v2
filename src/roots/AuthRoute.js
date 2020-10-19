import React, {useState} from "react";
import {useSelector} from "react-redux";
import {NavLink, Redirect, Route} from "react-router-dom";
import {Layout, Menu} from 'antd';
import {
  ContainerOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined
} from "@ant-design/icons";

const {Header, Sider, Content} = Layout;

const getActiveMenu = pathname => {
  if (pathname.startsWith('/update-order')) {
    return '/my-order';
  } else {
    return pathname;
  }
}

const AuthRoute = props => {
  const {loggedIn} = useSelector(state => state.authentication);
  const [collapsed, setCollapsed] = useState(false);
  const {type, location} = props;
  if (!loggedIn && type === 'private') return <Redirect to="/login"/>
  else if (loggedIn && type === 'guest') return <Redirect to="/my-order"/>
  return type === 'private' ? (
    <Layout className="app">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getActiveMenu(location.pathname)]}
        >
          <Menu.Item key="/create-order" icon={<FileOutlined/>}>
            <NavLink
              activeClassName="selected"
              to="/create-order">Create Order</NavLink>
          </Menu.Item>
          <Menu.Item key="/my-order" icon={<UnorderedListOutlined/>}>
            <NavLink
              activeClassName="selected"
              to="/my-order">My Order</NavLink>
          </Menu.Item>
          <Menu.Item key="/template" icon={<ContainerOutlined/>}>
            <NavLink
              activeClassName="selected"
              to="/template">Template</NavLink>
          </Menu.Item>
          <Menu.Item key="/user-setting" icon={<UserOutlined/>}>
            <NavLink
              activeClassName="selected"
              to="/user-setting">User Setting</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
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
  ) : <Route {...props} />
};
export default AuthRoute;
