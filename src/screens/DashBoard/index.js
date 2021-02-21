import React, { useEffect, useState } from 'react';
import './styles.less';
import { Col, Row, Collapse, Divider, Card, Avatar } from 'antd';
import OrderByStatus from './OrderByStatus/index';
import MyResponsiveBar from './OrderCount';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Panel } = Collapse;
const text = `Create React App Configuration Override is an easy and
              comprehensible configuration layer for create-react-app. Get all
              the benefits of create-react-app and customization without using
              'eject' by adding a single craco.config.js file at the root of
              your application and customize your eslint, babel, postcss
              configurations and many more. All you have to do is create your
              app using create-react-app and customize the configuration with a
              craco.config.js file.`;
const DashBoard = () => {
  useEffect(() => {}, []);
  const callback = (key) => {
    console.log(key);
  };

  return (
    <>
      <Row gutter={[8, 16]} className="gx-mt-1">
        <Col span={8}>
          <div className="dashboard-order__pie">
            <OrderByStatus />
          </div>
        </Col>
        <Col span={8}>
          <div className="dashboard-order__pie">
            <MyResponsiveBar />
          </div>
        </Col>
        <Col span={8}>
          <div className="dashboard-order__pie">
            <OrderByStatus />
          </div>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 16]} className="gx-mt-1">
        <Col span={12}>
          <Card hoverable title="Thông tin mới">
            <Card type="inner" title="Thông tin 1" extra={<a href="#">More</a>}>
              {text}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Thông tin 2"
              extra={<a href="#">More</a>}
            >
              {text}
            </Card>
          </Card>
          ,
        </Col>
        <Col span={12}>
          <Card
            hoverable
            bordered
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
          ,
        </Col>
      </Row>
    </>
  );
};
export default DashBoard;
