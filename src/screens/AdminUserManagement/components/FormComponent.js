import React from 'react';
import 'rc-color-picker/assets/index.css';
import { Col, Input, Row, Select } from 'antd';
import * as CONSTANTS from '../../../constants';

const FormComponent = ({
  data: {
    email,
    fullName,
    password,
    roleIds,
    userId,
    userStatus,
    uploadLimit,
    roles,
  },
  enabledEmail,
  onChange,
  onChangeAdvance,
}) => {
  return (
    <div className="gx-mb-3">
      <Row gutter={[12, 12]}>
        <Col span="24">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Email</div>
            <div className="basic-setting__control">
              <Input
                disabled={!enabledEmail}
                value={email}
                onChange={({ target: { value } }) => onChange('email', value)}
                size="small"
                style={{ width: 350 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Full Name</div>
            <div className="basic-setting__control">
              <Input
                value={fullName}
                onChange={({ target: { value } }) =>
                  onChange('fullName', value)
                }
                size="small"
                style={{ width: 350 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Password</div>
            <div className="basic-setting__control">
              <Input
                value={password}
                onChange={({ target: { value } }) =>
                  onChange('password', value)
                }
                size="small"
                type="password"
                style={{ width: 350 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Roles</div>
            <div className="basic-setting__control">
              <Select
                value={roleIds}
                onChange={(sel) => onChange('roleIds', sel)}
                size="small"
                mode="multiple"
                style={{ width: 350 }}
              >
                {roles.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.roleId}>
                      {item.authority}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">UserStatus</div>
            <div className="basic-setting__control">
              <Select
                value={userStatus}
                onChange={(val) => onChange('userStatus', val)}
                size="small"
                style={{ width: 350 }}
              >
                {CONSTANTS.USER_STATUS.map((item, index) => {
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
            <div className="basic-setting__label">Upload Limit</div>
            <div className="basic-setting__control">
              <Input
                onChange={({ target: { value } }) =>
                  onChange('uploadLimit', value)
                }
                value={uploadLimit}
                size="small"
                // onBlur={onBlur}
                placeholder="Input a number"
                style={{ width: 350 }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FormComponent;
