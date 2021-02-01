import React, { useEffect, useState } from 'react';
import './styles.less';
import { Col, Row } from 'antd';
import OrderByStatus from './OrderByStatus/index';
import MyResponsiveBar from './OrderCount';

const DashBoard = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Row gutter={[0, 16]} className="gx-mt-1">
        <Col span={12}>
          <div className="dashboard-order__pie">
            <OrderByStatus />
          </div>
        </Col>
        <Col span={12}>
          <div className="dashboard-order__pie">
            <MyResponsiveBar />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default DashBoard;
