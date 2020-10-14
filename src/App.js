import React, {useState} from 'react';
import './styles/index.less';
import './App.less';
import {Link, Route, Switch} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {
  ContainerOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import CreateOrder from "./screens/CreateOrder";
import Template from "./screens/Template";
import UserSetting from "./screens/UserSetting";
import MyOrder from "./screens/MyOrder";

const {Header, Sider, Content} = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
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
          <Switch>
            <Route path="/create-order" component={CreateOrder}/>
            <Route path="/my-order" component={MyOrder}/>
            <Route path="/template" component={Template}/>
            <Route path="/user-setting" component={UserSetting}/>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
