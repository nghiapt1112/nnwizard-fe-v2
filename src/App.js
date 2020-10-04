import React from 'react';
import './styles/index.less';
import './App.less';
import {Switch, Route, Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileOutlined,
  UnorderedListOutlined,
  ContainerOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {useState} from "react";
import CreateOrder from "./screens/CreateOrder";

const {Header, Sider, Content} = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="app">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<FileOutlined/>}>
            <Link to="/create-order">Create Order</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            <Link to="/my-order">My Order</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to="/template">Template</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
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
          <Switch>
            <Route path="/create-order" component={CreateOrder} exact/>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
