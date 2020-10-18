import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect, Route} from "react-router-dom";
import {Layout, Menu} from 'antd';
import {
  ContainerOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined
} from "@ant-design/icons";
import {authenticationAction} from "../redux/actions";

const {Header, Sider, Content} = Layout;

const AuthRoute = props => {
  const dispatch = useDispatch();
  const {loggedIn} = useSelector(state => state.authentication);
  const {type} = props;
  const [collapsed, setCollapsed] = useState(false);
  const logout = () => {
    dispatch(authenticationAction.logout());
  }
  if (!loggedIn && type === 'private') return <Redirect to="/login"/>
  else if (loggedIn && type === 'guest') return <Redirect to="/home"/>
  return type === 'private' ? (
    <Layout className="app">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<FileOutlined/>} className="high-light__menu">
            <Link to="/create-order">Create Order</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined/>}>
            <Link to="/my-order">My Order</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined/>}>
            <Link to="/template">Template</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined/>}>
            <Link to="/user-setting">User Setting</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <a onClick={logout}>Logout</a>
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
