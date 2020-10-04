import React from 'react';
import 'rc-color-picker/assets/index.css';
import {Col, Divider, Row} from 'antd';
import InstructionsItem from "./InstructionsItem";
import UploadButton from "../../../components/UploadButton";

const Instructions = ({
                        data = [],
                        onItemChange,
                        onAddFiles
                      }) => {
  return (
    <>
      <Row gutter={[0, 12]}>
        <Col span="24">
          <UploadButton
            onChange={onAddFiles}
          />
        </Col>
      </Row>
      <Divider orientation="left">Instructions Providing</Divider>
      <div className="instruction__list-item">
        {data.map((instruction, index) => {
          return (
            <InstructionsItem
              instruction={instruction}
              onChange={(key, value) => onItemChange(index, key, value)}/>
          )
        })}
      </div>
    </>
  )
}

export default Instructions;
