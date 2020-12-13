import React from 'react';
import 'rc-color-picker/assets/index.css';
import { Col, Input, Row, Select } from 'antd';
import * as CONSTANTS from '../../../../constants';

const MasterDataForm = ({
  data: { code, dataType, requestType, price, formTitle },
  onChange,
  onChangeAdvance,
}) => {
  return (
    <div className="gx-mb-3">
      <Row gutter={[12, 12]}>
        <Col span="10">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Code</div>
            <div className="basic-setting__control">
              <Input
                value={code}
                onChange={({ target: { value } }) => onChange('code', value)}
                size="small"
                style={{ width: 150 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">FormTitle</div>
            <div className="basic-setting__control">
              <Input
                value={formTitle}
                onChange={({ target: { value } }) =>
                  onChange('formTitle', value)
                }
                size="small"
                style={{ width: 150 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Data Type</div>
            <div className="basic-setting__control">
              <Select
                value={dataType}
                onChange={(sel) => onChange('dataType', sel)}
                size="small"
                // mode="multiple"
                style={{ width: 150 }}
              >
                {CONSTANTS.DATA_TYPE.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.value}>
                      {item.text}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Request Type</div>
            <div className="basic-setting__control">
              <Select
                value={requestType}
                onChange={(val) => onChange('requestType', val)}
                size="small"
                style={{ width: 150 }}
              >
                {CONSTANTS.ORDER_REQUEST_TYPE.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.value}>
                      {item.text}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Price</div>
            <div className="basic-setting__control">
              <Input
                value={price}
                onChange={({ target: { value } }) => onChange('price', value)}
                size="small"
                style={{ width: 150 }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MasterDataForm;
