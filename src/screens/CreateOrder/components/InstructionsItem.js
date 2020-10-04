import React from 'react';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import {Checkbox, Col, Collapse, Image, Input, Row, Select, Switch} from 'antd';
import {CREATE_ORDER_VALUES} from "../../../constants";

const InstructionsItem = ({
                            description,
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
                          }, onChange) => {
  return (
    <>
      <Row gutter={[12, 12]} justify="space-around" align="middle" className="uploading-file__item">
        <Col flex={'150px'}>
          <Image
            width={142}
            height={142}
            src="error"
            fallback="data:image/png;base64,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"
          />
        </Col>
        <Col flex={'auto'}>
          <Input.TextArea
            value={description}
            placeholder="Please provide instructions ..."
            rows="6"
          />
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header="Basic Setting" key="1">
              <Row gutter="24">
                <Col flex="1">
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">File format</div>
                    <div>
                      <Select
                        value={fileFormat}
                        onChange={(val) => onChange('fileFormat', val)}
                        size="small"
                        style={{width: 150}}>
                        {CREATE_ORDER_VALUES.FILE_FORMAT.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                          )
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Background</div>
                    <div>
                      <ColorPicker color={'#0F0'} placement="bottomRight"/>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Size</div>
                    <div>
                      <Select
                        value={size}
                        onChange={(val) => onChange('size', val)}
                        size="small"
                        style={{width: 150}}>
                        {CREATE_ORDER_VALUES.SIZE.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                          )
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Aspect Ratio</div>
                    <div>
                      <Select
                        value={aspectRatio}
                        onChange={(val) => onChange('aspectRatio', val)}
                        size="small"
                        style={{width: 150}}>
                        {CREATE_ORDER_VALUES.ASPECT_RATIO.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                          )
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Min-Max size</div>
                    <div>
                      <Select
                        value={minMaxSize}
                        onChange={(val) => onChange('minMaxSize', val)}
                        size="small"
                        style={{width: 150}}>
                        {CREATE_ORDER_VALUES.MIN_MAX_SIZE.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                          )
                        })}
                      </Select>
                    </div>
                  </div>
                </Col>
                <Col flex="1">
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">PSD with layers</div>
                    <div>
                      <Checkbox
                        checked={psdWithLayers}
                        onChange={({target: {checked}}) => onChange('psdWithLayers', checked)}
                        size="small"
                      >Price + 100% (double price)</Checkbox>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Margin</div>
                    <div>
                      <Switch
                        checked={margin}
                        onChange={(val) => onChange('margin', val)}
                        size="small"
                        defaultChecked/>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Left</div>
                    <div>
                      <Input
                        value={margin_left}
                        onChange={({target: {value}}) => onChange('margin_left', value)}
                        size="small"
                        suffix="%"
                        style={{width: 70}}/>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Right</div>
                    <div>
                      <Input
                        value={margin_right}
                        onChange={({target: {value}}) => onChange('margin_right', value)}
                        size="small"
                        suffix="%"
                        style={{width: 70}}/>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Top</div>
                    <div>
                      <Input
                        value={margin_top}
                        onChange={({target: {value}}) => onChange('margin_top', value)}
                        size="small"
                        suffix="%"
                        style={{width: 70}}/>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Bottom</div>
                    <div>
                      <Input
                        value={margin_bottom}
                        onChange={({target: {value}}) => onChange('margin_bottom', value)}
                        size="small"
                        suffix="%"
                        style={{width: 70}}/>
                    </div>
                  </div>
                </Col>
                <Col flex="1">
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Prefix</div>
                    <div>
                      <Input
                        value={preFix}
                        onChange={({target: {value}}) => onChange('preFix', value)}
                        size="small"
                        placeholder="prefix_filename.jpg"
                        style={{width: 150}}/>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Postfix</div>
                    <div>
                      <Input
                        value={postFix}
                        onChange={({target: {value}}) => onChange('postFix', value)}
                        size="small"
                        placeholder="filename_postfix.jp"
                        style={{width: 150}}/>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">DPI</div>
                    <div>
                      <Select
                        value={dpi}
                        onChange={(value) => onChange('dpi', value)}
                        size="small"
                        style={{width: 150}}>
                        {CREATE_ORDER_VALUES.DPI.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                          )
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="basic-setting__item">
                    <div className="basic-setting__label">Compression</div>
                    <div>
                      <Select
                        value={compression}
                        onChange={(value) => onChange('compression', value)}
                        size="small"
                        style={{width: 150}}>
                        {CREATE_ORDER_VALUES.COMPRESSION.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                          )
                        })}
                      </Select>
                    </div>
                  </div>
                </Col>
              </Row>
            </Collapse.Panel>
            <Collapse.Panel header="Advance Setting" key="2">
              <div className="advance-setting__list">
                {CREATE_ORDER_VALUES.ADVANCE_LIST.map((setting, index) => <Checkbox
                  key={index}>{setting.text}</Checkbox>)}
              </div>
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  )
}

export default InstructionsItem;
