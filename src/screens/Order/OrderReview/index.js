import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Descriptions, Badge, Button } from 'antd';
import { paymentService } from '../../../services';

const OrderReview = () => {
  const { userInfo } = useSelector((state) => state.authentication);
  const query = new URLSearchParams(window.location.search);
  const paymentId = query.get('paymentId');
  const PayerID = query.get('PayerID');
  const token = query.get('token');
  const [orderReview, setOrderReview] = useState({});

  useEffect(() => {
    async function fetchOrderReview() {
      const res = await paymentService.review({
        paymentId,
        PayerID,
        token,
      });
      setOrderReview(res);
    }

    fetchOrderReview();
  }, [paymentId, PayerID, token]);

  const onChange = (e) => {
    console.log('size checked', e);
  };

  return (
    <>
      <h1>Please Review Before Paying</h1>
      <div>
        <Descriptions
          bordered
          title="Transaction Details"
          size={'default'}
          extra={
            <Button type="primary" onClick={onChange}>
              Confirm
            </Button>
          }
        >
          <Descriptions.Item label="Merchant">Company ABC</Descriptions.Item>
          <Descriptions.Item label="Payer">
            {orderReview.payerInfo?.firstName} {orderReview.payerInfo?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Badge status="processing" text="Running" />
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {orderReview.transactionDescription}
          </Descriptions.Item>
          <Descriptions.Item label="Subtotal">
            {orderReview.transactionSubTotal}
          </Descriptions.Item>
          <Descriptions.Item label="Shipping">
            {orderReview.transactionShipping}
          </Descriptions.Item>
          <Descriptions.Item label="Tax">
            {orderReview.transactionTax}
          </Descriptions.Item>
          <Descriptions.Item label="Total">
            {orderReview.transactionTotal}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <br />
        <Descriptions bordered title="Payer Information" size={'default'}>
          <Descriptions.Item label="First Name">
            payer.firstName
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            payer.lastname
          </Descriptions.Item>
          <Descriptions.Item label="Email">payer.email</Descriptions.Item>
          <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
          <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
          <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default OrderReview;
