import React, {useState} from "react";
import {useSelector} from "react-redux";
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

const {Header, Sider, Content} = Layout;

const AuthRoute = props => {
  const {loggedIn} = useSelector(state => state.authentication);
  const [collapsed, setCollapsed] = useState(false);
  const {type} = props;
  if (!loggedIn && type === 'private') return <Redirect to="/login"/>
  else if (loggedIn && type === 'guest') return <Redirect to="/my-order"/>
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
