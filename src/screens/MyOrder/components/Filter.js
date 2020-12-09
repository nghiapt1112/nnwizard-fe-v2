import React, { useState } from 'react';
import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import * as CONSTANTS from '../../../constants';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const Filter = ({ keyword, type, status, fromDate, toDate, onSearchClick }) => {
  const [searchParams, setSearchParams] = useState({});
  const onChange = (key, value) => {
    const tmpSearchParams = { ...searchParams };
    tmpSearchParams[key] = value;
    setSearchParams(tmpSearchParams);
  };
  const onDateRangeChange = (value) => {
    const tmpSearchParams = { ...searchParams };
    tmpSearchParams['fromDate'] = value[0].unix();
    tmpSearchParams['toDate'] = value[1].unix();
    setSearchParams(tmpSearchParams);
  };
  return (
    <>
      <Row gutter={[12, 0]}>
        <Col span="6">
          <Input
            value={keyword}
            onChange={({ target: { value } }) => onChange('keyword', value)}
            size="small"
            placeholder="Search by order name ..."
            style={{ width: '100%' }}
          />
        </Col>
        <Col span="4">
          <Select
            placeholder="By Type"
            value={type}
            onChange={(val) => onChange('type', val)}
            size="small"
            style={{ width: '100%' }}
          >
            {CONSTANTS.ORDER_REQUEST_TYPE.map((item, index) => {
              return (
                <Select.Option key={index} value={item.value}>
                  {item.text}
                </Select.Option>
              );
            })}
          </Select>
        </Col>
        <Col span="4">
          <Select
            placeholder="By Status"
            value={status}
            onChange={(val) => onChange('status', val)}
            size="small"
            style={{ width: '100%' }}
          >
            {CONSTANTS.ORDER_STATUS.map((item, index) => {
              return (
                <Select.Option key={index} value={item.value}>
                  {item.text}
                </Select.Option>
              );
            })}
          </Select>
        </Col>
        <Col span="7">
          <RangePicker
            placeholder={['From Date', 'To Date']}
            size="small"
            style={{ width: '100%' }}
            onChange={(val) => onDateRangeChange(val)}
          />
        </Col>
        <Col span="3">
          <Button
            onClick={() => onSearchClick(searchParams)}
            block
            size="small"
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Filter;
