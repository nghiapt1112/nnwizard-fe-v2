import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Image, Input, Row, Select, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import ColorPicker from 'rc-color-picker';
import { cloneDeep } from 'lodash';
import * as CONSTANTS from '../../../constants';
import UploadButton from '../../../components/UploadButton';
import { toBase64 } from '../../../utils/converts';
import './styles.less';
import { templateService } from '../../../services';

const { TextArea } = Input;

const {
  data: {
    fileFormat,
    background,
    size,
    minMaxSize,
    margin,
    preFix,
    postFix,
    dpi,
    compression,
  },
} = { data: {} };

const onChange = () => {};

const CreateSpecificationOrder = () => {
  const [files, setFiles] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function fetchTemplates() {
      const res = await templateService.getAll({
        page: 1,
        size: 10000,
      });
      setTemplates([...res.content]);
    }
    fetchTemplates();
  }, []);

  const onChangeTemplate = async (tId) => {
    const res = await templateService.getById(tId);
    console.log(res);
  };

  const onAddFiles = async (event) => {
    let filesClone = cloneDeep(files);
    const { files: filesSelected } = event.target;
    const filesBase64 = await Promise.all(
      Array.from(filesSelected).map((file) => toBase64(file))
    );
    filesClone = filesClone.concat(
      filesBase64.map((file) => {
        return {
          ...file,
          fileName: file.blob.name,
          type: file.blob.type,
        };
      })
    );
    setFiles(filesClone);
  };
  const onDeleteFile = (index) => {
    let filesClone = cloneDeep(files);
    filesClone.splice(index, 1);
    setFiles(filesClone);
  };
  return (
    <>
      <div className="header-page">
        <h2>
          {true ? 'Update Specification Order' : 'Create Specification Order'}
        </h2>
        <div>
          <Select
            value={fileFormat}
            onChange={(val) => onChangeTemplate(val)}
            style={{ width: 200 }}
            placeholder="Select template"
          >
            {templates.map((item, index) => {
              return (
                <Select.Option key={index} value={item.tid}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      </div>
      <Row gutter={[24, 12]}>
        <Col span={10}>
          <Row>
            <Col span="24">
              <Divider orientation="left">Upload Images</Divider>
            </Col>
            <Col span="24">
              <UploadButton onChange={onAddFiles} />
            </Col>
            <Col span={24}>
              <div className="img-list">
                {files.map((img, index) => {
                  return (
                    <div className="img-item" key={index}>
                      <Image
                        key={img}
                        width={70}
                        height={70}
                        src={img.base64}
                        fallback="data:image/png;base64,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"
                      />
                      <Button
                        onClick={() => onDeleteFile(index)}
                        size="small"
                        danger
                        className="img-item_button--delete"
                        type="dashed"
                        shape="circle"
                        icon={<CloseOutlined />}
                      />
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <Row gutter={[24, 0]}>
            <Col span="24">
              <Divider orientation="left">Basic Setting</Divider>
            </Col>
            <Col span="12">
              <div className="basic-setting__item">
                <div className="basic-setting__label">Prefix</div>
                <div className="basic-setting__control">
                  <Input
                    value={preFix}
                    onChange={({ target: { value } }) =>
                      onChange('preFix', value)
                    }
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
                    onChange={({ target: { value } }) =>
                      onChange('postFix', value)
                    }
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
                    checked={margin}
                    onChange={(val) => onChange('modelCropping', val)}
                    size="small"
                    defaultChecked
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </div>
              </div>
            </Col>
            <Col span="12">
              <div className="basic-setting__item">
                <div className="basic-setting__label">Max output file size</div>
                <div className="basic-setting__control">
                  <Select
                    value={minMaxSize}
                    onChange={(val) => onChange('maxOutputFileSize', val)}
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
                    color={background || '#fff'}
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
                    value={dpi}
                    onChange={(value) => onChange('metaData', value)}
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
              <div className="basic-setting__item">
                <div className="basic-setting__label">JPG quality</div>
                <div className="basic-setting__control">
                  <Select
                    value={compression}
                    onChange={(value) => onChange('jpgQuality', value)}
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
                <div className="basic-setting__label">
                  <span className="gx-mr-1">Progressive</span>
                </div>
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
                <div className="basic-setting__label">
                  <span className="gx-mr-1">Normalize rotation</span>
                </div>
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
            </Col>
            <Col span="24">
              <Divider orientation="left">Retouching</Divider>
            </Col>
            <Col span="24">
              <TextArea rows={4} />
              <TextArea
                className="gx-mt-3"
                placeholder="Add something more here"
                rows={8}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default CreateSpecificationOrder;
