import React from 'react';
import { Card, List } from 'antd';
import * as CONSTANTS from '../../../constants';
import { useHistory } from 'react-router-dom';

const { Meta } = Card;
const OrderChooser = () => {
  const history = useHistory();
  const onClick = (item, index) => {
    switch (item) {
      case 'GENERAL':
        history.push('/co-general');
        break;
      case 'REAL_ESTATE':
        history.push('/co-re');
        break;
      default:
        console.log('khong parse dc ');
    }
  };

  return (
    <>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 5,
        }}
        dataSource={CONSTANTS.ORDER_REQUEST_TYPE}
        renderItem={(item, index) => (
          <List.Item onClick={() => onClick(item.value, index)}>
            <Card
              hoverable
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta title={item.text} description="This is the description" />
            </Card>
            ,
          </List.Item>
        )}
      />
    </>
  );
};

export default OrderChooser;
