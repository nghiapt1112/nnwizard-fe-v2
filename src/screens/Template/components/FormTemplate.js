import React from 'react';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import {
  Checkbox,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Switch,
  Tooltip,
} from 'antd';
import * as CONSTANTS from '../../../constants';
import { TEMPLATE_TYPE } from '../../../constants';
import { InfoCircleOutlined } from '@ant-design/icons';

const FormTemplate = ({
  advanceSetting,
  data: {
    name,
    fileFormat,
    background,
    size,
    aspectRatio,
    minMaxSize,
    psdWithLayers,
    margin,
    margin_left,
    margin_right,
    margin_top,
    margin_bottom,
    preFix,
    postFix,
    dpi,
    compression,
    codes = {},
    settingIds = {},
  },
  onChange,
  onChangeAdvance,
}) => {
  return (
    <div className="gx-mb-3">
      <Row gutter={[24, 24]}>
        <Col span="8">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Name</div>
            <div className="basic-setting__control">
              <Input
                value={name}
                onChange={({ target: { value } }) => onChange('name', value)}
                size="small"
                style={{ width: 150 }}
              />
            </div>
          </div>
        </Col>
        <Col span="10">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Template Type</div>
            <div className="basic-setting__control">
              <Select
                value={TEMPLATE_TYPE.GENERAL}
                onChange={(val) => onChange('requestType', val)}
                size="small"
                style={{ width: 180 }}
                disabled={true}
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
        </Col>
        <Col span="24">
          <Divider orientation="left">Basic Setting</Divider>
        </Col>
        <Col flex="1">
          <div className="basic-setting__item">
            <div className="basic-setting__label">File format</div>
            <div className="basic-setting__control">
              <Select
                value={fileFormat}
                onChange={(val) => onChange('fileFormat', val)}
                mode="multiple"
                size="small"
                style={{ width: 150 }}
              >
                {CONSTANTS.FILE_FORMAT.map((item, index) => {
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
            <div className="basic-setting__label">Background</div>
            <div className="basic-setting__control">
              <ColorPicker
                color={background || '#fff'}
                onChange={({ color }) => onChange('background', color)}
                className="basic-setting__color-picker"
                placement="bottomRight"
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Size</div>
            <div className="basic-setting__control">
              <Select
                value={size}
                onChange={(val) => onChange('size', val)}
                size="small"
                style={{ width: 150 }}
              >
                {CONSTANTS.SIZE.map((item, index) => {
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
            <div className="basic-setting__label">Aspect Ratio</div>
            <div className="basic-setting__control">
              <Select
                value={aspectRatio}
                onChange={(val) => onChange('aspectRatio', val)}
                size="small"
                style={{ width: 150 }}
              >
                {CONSTANTS.ASPECT_RATIO.map((item, index) => {
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
            <div className="basic-setting__label">Min-Max size</div>
            <div className="basic-setting__control">
              <Select
                value={minMaxSize}
                onChange={(val) => onChange('minMaxSize', val)}
                size="small"
                style={{ width: 150 }}
              >
                {CONSTANTS.MIN_MAX_SIZE.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.value}>
                      {item.text}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </Col>
        <Col flex="1">
          <div className="basic-setting__item">
            <div className="basic-setting__label">
              <span className="gx-mr-1">PSD with layers</span>
              <Tooltip placement="topLeft" title="Price + 100% (double price)">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div className="basic-setting__control">
              <Switch
                checked={psdWithLayers}
                onChange={(val) => onChange('psdWithLayers', val)}
                size="small"
                defaultChecked
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Margin</div>
            <div className="basic-setting__control">
              <Switch
                checked={margin}
                onChange={(val) => onChange('margin', val)}
                size="small"
                defaultChecked
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Left</div>
            <div className="basic-setting__control">
              <Input
                disabled={!margin}
                value={margin_left}
                onChange={({ target: { value } }) =>
                  onChange('margin_left', value)
                }
                size="small"
                suffix="%"
                style={{ width: 70 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Right</div>
            <div className="basic-setting__control">
              <Input
                disabled={!margin}
                value={margin_right}
                onChange={({ target: { value } }) =>
                  onChange('margin_right', value)
                }
                size="small"
                suffix="%"
                style={{ width: 70 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Top</div>
            <div className="basic-setting__control">
              <Input
                disabled={!margin}
                value={margin_top}
                onChange={({ target: { value } }) =>
                  onChange('margin_top', value)
                }
                size="small"
                suffix="%"
                style={{ width: 70 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Bottom</div>
            <div className="basic-setting__control">
              <Input
                disabled={!margin}
                value={margin_bottom}
                onChange={({ target: { value } }) =>
                  onChange('margin_bottom', value)
                }
                size="small"
                suffix="%"
                style={{ width: 70 }}
              />
            </div>
          </div>
        </Col>
        <Col flex="1">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Prefix</div>
            <div className="basic-setting__control">
              <Input
                value={preFix}
                onChange={({ target: { value } }) => onChange('preFix', value)}
                size="small"
                placeholder="prefix_filename.jpg"
                style={{ width: 150 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Postfix</div>
            <div className="basic-setting__control">
              <Input
                value={postFix}
                onChange={({ target: { value } }) => onChange('postFix', value)}
                size="small"
                placeholder="filename_postfix.jp"
                style={{ width: 150 }}
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">DPI</div>
            <div className="basic-setting__control">
              <Select
                value={dpi}
                onChange={(value) => onChange('dpi', value)}
                size="small"
                style={{ width: 150 }}
              >
                {CONSTANTS.DPI.map((item, index) => {
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
            <div className="basic-setting__label">Compression</div>
            <div className="basic-setting__control">
              <Select
                value={compression}
                onChange={(value) => onChange('compression', value)}
                size="small"
                style={{ width: 150 }}
              >
                {CONSTANTS.COMPRESSION.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.value}>
                      {item.text}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </Col>
        <Col span="24">
          <Divider orientation="left">Advance Setting</Divider>
        </Col>
        <Col span="24">
          <div className="advance-setting__list">
            {advanceSetting.map((setting, index) => (
              <Checkbox
                checked={codes[setting.value]}
                onChange={({ target: { checked } }) =>
                  onChangeAdvance(setting.value, checked)
                }
                key={index}
              >
                {setting.text}
              </Checkbox>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FormTemplate;
