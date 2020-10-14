import React from "react";
import {Button, Col, DatePicker, Input, Row, Select} from 'antd';
import {CREATE_ORDER_VALUES} from "../../../constants";
import {SearchOutlined} from '@ant-design/icons';

const {RangePicker} = DatePicker;

const Filter = ({
                  keyword,
                  type,
                  status,
                  fromDate,
                  toDate,
                  onChange
                }) => {
  return (
    <>
      <Row gutter={[12, 0]}>
        <Col span="6">
          <Input
            value={keyword}
            onChange={({target: {value}}) => onChange('keyword', value)}
            size="small"
            placeholder="Search by order name ..."
            style={{width: '100%'}}/>
        </Col>
        <Col span="4">
          <Select
            placeholder="By Type"
            value={type}
            onChange={(val) => onChange('type', val)}
            size="small"
            style={{width: '100%'}}>
            {CREATE_ORDER_VALUES.TEMPLATE_TYPE.map((item, index) => {
              return (
                <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
              )
            })}
          </Select>
        </Col>
        <Col span="4">
          <Select
            placeholder="By Status"
            value={status}
            onChange={(val) => onChange('status', val)}
            size="small"
            style={{width: '100%'}}>
            {CREATE_ORDER_VALUES.ORDER_STATUS.map((item, index) => {
              return (
                <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
              )
            })}
          </Select>
        </Col>
        <Col span="7">
          <RangePicker
            placeholder={['From Date', 'To Date']}
            size="small"
            style={{width: '100%'}}
          />
        </Col>
        <Col span="3">
          <Button
            block
            size="small"
            icon={<SearchOutlined/>}
          >Search</Button>
        </Col>
      </Row>
    </>
  )
}

export default Filter;
