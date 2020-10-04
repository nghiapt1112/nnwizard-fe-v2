import React from 'react';
import 'rc-color-picker/assets/index.css';
import {Card, Col, Divider, Row} from 'antd';
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
      {data.map((instruction, index) => {
        return (
          <Card
            key={index}
            className="instructions-card__instructions--item">
            <InstructionsItem
              instruction={instruction}
              onChange={(key, value) => onItemChange(index, key, value)}/>
          </Card>
        )
      })}
    </>
  )
}

export default Instructions;
