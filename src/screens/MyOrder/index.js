import React from "react";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useHistory} from 'react-router-dom';
import Filter from "./components/Filter";

const MyOrder = () => {
  const history = useHistory();
  return (
    <>
      <div className="page-header">
        <h2>My Order</h2>
        <Button
          onClick={() => history.push('/create-order')}
          type="primary"
          icon={<PlusOutlined/>}
        >Create Order</Button>
      </div>
      <Filter/>
    </>
  )
}

export default MyOrder;
