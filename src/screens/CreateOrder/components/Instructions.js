import React from 'react';
import 'rc-color-picker/assets/index.css';
import {Col, Divider, Row, Select} from 'antd';
import InstructionsItem from "./InstructionsItem";
import UploadButton from "../../../components/UploadButton";

const Instructions = ({
                        data = [],
                        tid,
                        templates = [],
                        onChangeTemplate,
                        onItemChange,
                        onChangeAdvance,
                        onAddFiles
                      }) => {
  return (
    <>
      <Row gutter={[0, 12]}>
        <Col span="12">
          <UploadButton
            onChange={onAddFiles}
          />
        </Col>
        <Col span="12">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Template</div>
            <div className="basic-setting__control">
              <Select
                value={tid}
                onChange={(val) => onChangeTemplate(val)}
                size="small"
                style={{width: 250}}>
                {templates.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.tid}>{item.name}</Select.Option>
                  )
                })}
              </Select>
            </div>
          </div>
        </Col>
      </Row>
      <Divider orientation="left">Instructions Providing</Divider>
      <div className="instruction__list-item">
        {data.map((instruction, index) => {
          return (
            <InstructionsItem
              key={index}
              instruction={instruction}
              onChange={(key, value) => onItemChange(index, key, value)}
              onChangeAdvance={(key, value) => onChangeAdvance(index, key, value)}
            />
          )
        })}
      </div>
    </>
  )
}

export default Instructions;
