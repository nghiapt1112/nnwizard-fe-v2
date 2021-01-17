import React from 'react';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import { Checkbox, Col, Divider, Input, Row, Select, Switch } from 'antd';
import * as CONSTANTS from '../../../constants';
import { TEMPLATE_TYPE } from '../../../constants';

const SpecificationTemplate = ({
  advanceSetting,
  price,
  data: {
    name,
    preFix,
    postFix,
    fileFormat,
    background,
    size,
    modelCropping,
    maxOutputFileSize,
    dpi,
    colorProfile,
    metaData,
    compression,
    jpgQuality,
    progressive,
    normalRotation,
    codes = {},
    settingIds = [],
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
        <Col span="8">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Template Type</div>
            <div className="basic-setting__control">
              <Select
                value={TEMPLATE_TYPE.REAL_ESTATE}
                onChange={(val) => onChange('type', val)}
                size="small"
                style={{ width: 180 }}
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
        <Col span="8">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Price</div>
            <div className="basic-setting__control">
              <Input value={price} disabled size="small" />
            </div>
          </div>
        </Col>
        <Col span="24">
          <Divider orientation="left">Basic Setting</Divider>
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
            <div className="basic-setting__label">
              <span className="gx-mr-1">Model cropping</span>
            </div>
            <div className="basic-setting__control">
              <Switch
                checked={modelCropping}
                onChange={(val) => onChange('modelCropping', val)}
                size="small"
                defaultChecked
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </div>
          </div>
        </Col>
        <Col flex="1">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Max output file size</div>
            <div className="basic-setting__control">
              <Select
                value={maxOutputFileSize}
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
            <div className="basic-setting__label">Color profile</div>
            <div className="basic-setting__control">
              <ColorPicker
                color={colorProfile || '#fff'}
                onChange={({ color }) => onChange('colorProfile', color)}
                className="basic-setting__color-picker"
                placement="bottomRight"
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">Meta data</div>
            <div className="basic-setting__control">
              <Select
                value={metaData}
                onChange={(value) => onChange('metaData', value)}
                size="small"
                style={{ width: 150 }}
              >
                {CONSTANTS.META_DATA.map((item, index) => {
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
          <div className="basic-setting__item">
            <div className="basic-setting__label">JPG quality</div>
            <div className="basic-setting__control">
              <Select
                value={jpgQuality}
                onChange={(value) => onChange('jpgQuality', value)}
                size="small"
                style={{ width: 150 }}
              >
                {CONSTANTS.JPG_QUALITY.map((item, index) => {
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
            <div className="basic-setting__label">
              <span className="gx-mr-1">Progressive</span>
            </div>
            <div className="basic-setting__control">
              <Switch
                checked={progressive}
                onChange={(val) => onChange('progressive', val)}
                size="small"
                defaultChecked
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </div>
          </div>
          <div className="basic-setting__item">
            <div className="basic-setting__label">
              <span className="gx-mr-1">Normalize rotation</span>
            </div>
            <div className="basic-setting__control">
              <Switch
                checked={normalRotation}
                onChange={(val) => onChange('normalRotation', val)}
                size="small"
                defaultChecked
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </div>
          </div>
        </Col>
        <Col span="24">
          <Divider orientation="left">Addon Setting</Divider>
        </Col>
        <Col span="24">
          <div className="advance-setting__list">
            {advanceSetting
              .filter((el) => el.type === 'ADDON')
              .map((setting, index) => (
                <Checkbox
                  checked={codes[setting.value]}
                  onChange={({ target: { checked } }) =>
                    onChangeAdvance(setting.value, checked)
                  }
                  key={index}
                >
                  {setting.text} ${setting.price}
                </Checkbox>
              ))}
          </div>
        </Col>
        <Col span="24">
          <Divider orientation="left">Retouch Setting</Divider>
        </Col>
        <Col span="24">
          <div className="advance-setting__list">
            {advanceSetting
              .filter((el) => el.type === 'RETOUCHING')
              .map((setting, index) => (
                <Checkbox
                  checked={codes[setting.value]}
                  onChange={({ target: { checked } }) =>
                    onChangeAdvance(setting.value, checked)
                  }
                  key={index}
                >
                  {setting.text} ${setting.price}
                </Checkbox>
              ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SpecificationTemplate;
