import React, {useState} from 'react';
import 'rc-color-picker/assets/index.css';
import {Button, Col, Divider, Row} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import InstructionsItem from "./InstructionsItem";

const Intructions = () => {
  const [intructions] = useState([{name: 'DING DONG'}]);
  return (
    <>
      <Row gutter={[0, 12]}>
        <Col span="24">
          <Button
            type="primary"
            icon={<PlusOutlined/>}
          >
            Upload Files ...
          </Button>
        </Col>
      </Row>
      <Divider orientation="left">File Uploaded</Divider>
      {intructions.map((intruction, index) => {
        return (
          <InstructionsItem key={index} {...intruction} />
        )
      })}
    </>
  )
}

export default Intructions;
