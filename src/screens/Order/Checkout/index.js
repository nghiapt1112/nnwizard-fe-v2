import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Descriptions, Button, Badge } from 'antd';
import { paymentService } from '../../../services';

const Checkout = () => {
  const { userInfo } = useSelector((state) => state.authentication);
  const query = new URLSearchParams(window.location.search);
  const paymentId = query.get('paymentId');
  const PayerID = query.get('PayerID');
  const token = query.get('token');
  const [orderReview, setOrderReview] = useState({});

  const onChange = (e) => {
    console.log('size checked', e.target.value);
  };

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

  return (
    <>
      <h1>Payment Done. Thank you for purchasing our products</h1>
      <div>
        <Descriptions
          bordered
          title="Receipt Details:"
          size={'default'}
          extra={<Button type="primary">Confirm</Button>}
        >
          <Descriptions.Item label="Merchant">Company ABC</Descriptions.Item>
          <Descriptions.Item label="Payer">
            {orderReview.payerInfo?.firstName} {orderReview.payerInfo?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Badge status="success" text="Success" />
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
      </div>
    </>
  );
};

export default Checkout;
