import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Image as ANTDImage,
  Input,
  notification,
  Row,
  Select,
  Switch,
} from 'antd';
import { CloseOutlined, CommentOutlined } from '@ant-design/icons';
import ColorPicker from 'rc-color-picker';
import { cloneDeep } from 'lodash';
import * as CONSTANTS from '../../../constants';
import UploadButton from '../../../components/UploadButton';
import { getImage, toBase64 } from '../../../utils/converts';
import './styles.less';
import { orderService, S3Service, templateService } from '../../../services';
import ImageComment from '../../../components/ImageComment';
import { isEmpty } from '../../../utils/objectUtils';
import { useHistory } from 'react-router-dom';
import { settingService } from '../../../services/setting.service';

const ADVANCE_SETTINGS = ['ADVANCE', 'ADDON', 'RETOUCHING', 'BASE_PRICE'];

const CreateSpecificationOrder = () => {
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);
  const [order, setOrder] = useState({ basicSetting: {}, images: [] });
  const [templates, setTemplates] = useState([]);
  const [codes, setCodes] = useState([]);
  const [imageSelectedIndex, setImageSelectedIndex] = useState(-1);
  const [imageSelected, setImageSelected] = useState({});
  const [modalImageCommentVisible, setModalImageCommentVisible] = useState(
    false
  );

  useEffect(() => {
    async function fetchSettings() {
      const res = await settingService.getAll({
        page: 1,
        size: 10000,
        types: [...ADVANCE_SETTINGS, 'BASIC'],
      });
      setCodes(res.content);
    }

    fetchSettings();
  }, []);

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
    try {
      const res = await templateService.getById(tId);
      if (res && res.basicSetting) {
        const tmpOrder = cloneDeep(order);
        tmpOrder.basicSetting = res.basicSetting;
        tmpOrder.settingIds = res.settingIds;
        setOrder(tmpOrder);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const onClickImage = (index) => {
    setImageSelectedIndex(index);
  };
  const onAddFiles = async (event) => {
    const tmpOrder = cloneDeep(order);
    let tmpImages = tmpOrder.images;
    const { files: filesSelected } = event.target;
    const filesBase64 = await Promise.all(
      Array.from(filesSelected).map((file) => toBase64(file))
    );
    tmpImages = tmpImages.concat(
      filesBase64.map((file) => {
        return {
          ...file,
          rawFile: file,
          fileName: file.blob.name,
          type: file.blob.type,
          size: file.size,
        };
      })
    );
    tmpOrder.images = tmpImages;
    setOrder(tmpOrder);
    setImageSelectedIndex(tmpImages.length - 1);
  };
  const onDeleteFile = (index) => {
    let tmpOrder = cloneDeep(order);
    let images = tmpOrder.images;
    images.splice(index, 1);
    setOrder(tmpOrder);
    setImageSelectedIndex(index - 1);
  };
  const onOpenModalImageComment = async () => {
    // Get image width height;
    const imgSelected = cloneDeep(order.images[imageSelectedIndex]);
    const dataComment =
      imgSelected.comments && imgSelected.comments.length
        ? JSON.parse(imgSelected.comments[0])
        : {};
    const image = await getImage(imgSelected.base64);
    imgSelected.width = image.width;
    imgSelected.height = image.height;
    setImageSelected({
      base64: imgSelected.base64,
      width: image.width,
      height: image.height,
      fileName: imgSelected.fileName,
      comments: dataComment.comments,
      imageDrawData: dataComment.imageDrawData,
    });
    setModalImageCommentVisible(true);
  };
  const onImageCommentOk = (val) => {
    const tmpOrder = cloneDeep(order);
    const imageUpdateComment = tmpOrder.images.find(
      (image) => image.fileName === imageSelected.fileName
    );
    if (imageUpdateComment) {
      imageUpdateComment.comments = [];
      imageUpdateComment.comments[0] = JSON.stringify(val);
      setOrder(tmpOrder);
      setModalImageCommentVisible(false);
    }
  };
  const uploadFiles = (links) => {
    const uploadProcess = links
      .map(({ preSignedURL, oname }) => {
        const image = order.images.find(
          (file) => file.fileName === oname && !file.imgId
        );
        if (!image) return null;
        return S3Service.upload(preSignedURL, image.rawFile);
      })
      .filter((promise) => promise);
    return Promise.all(uploadProcess);
  };
  const getLinkUploadFile = (orderId) => {
    const newFiles = order.images.filter((i) => !i.imgId);
    if (isEmpty(newFiles)) {
      return false;
    }
    let tmpFiles = newFiles.map((el) => {
      return {
        fileSize: el.size,
        oname: el.fileName,
        oName: el.fileName,
      };
    });
    return orderService.generateLinkUploadFile({
      orderId,
      files: tmpFiles,
    });
  };
  const getSenderData = (links) => {
    return order.images.map((image) => {
      let link = links && links.find(({ oname }) => oname === image.fileName);
      // const { imgId, preSignedURL, publicUrl } = link ? link : image;
      return {
        basicSetting: {
          ...order.basicSetting,
        },
        comments: image.comments,
        ...link,
      };
    });
  };
  const onChange = (key, value) => {
    const tmpOrder = cloneDeep(order);
    tmpOrder.basicSetting[key] = value;
    setOrder(tmpOrder);
  };
  const onChangeAdvance = (code) => {
    const tmpOrder = cloneDeep(order);
    const indexCode = tmpOrder.settingIds && tmpOrder.settingIds[code];
    if (indexCode && indexCode >= 0) {
      tmpOrder.settingIds.splice(indexCode, 1);
    } else {
      if (!tmpOrder.settingIds) tmpOrder.settingIds = [];
      tmpOrder.settingIds.push(code);
    }
    setOrder(tmpOrder);
  };
  const onSubmit = async () => {
    try {
      setIsSaving(true);
      let updateOrderID = order.orderId;
      if (!updateOrderID) {
        // Create order
        const payloadCreate = {
          orderType: 'REAL_ESTATE',
          orderName: `REAL_ESTATE_${new Date().getTime()}`,
        };
        const { id } = await orderService.create(payloadCreate);
        updateOrderID = id;
      }
      // Upload image
      const links = await getLinkUploadFile(updateOrderID);
      links && (await uploadFiles(links));
      // Submit Setting
      const updateData = getSenderData(links);
      await orderService.updateRealEstate(updateOrderID, {
        images: updateData,
      });
      setIsSaving(false);
      notification.success({
        message: 'Create Order Successfully',
      });
      history.push('/my-order');
    } catch (error) {
      setIsSaving(false);
      notification.error({
        message: error,
      });
    }
  };
  const {
    basicSetting: {
      fileFormat,
      background,
      size,
      modelCropping,
      maxOutputFileSize,
      colorProfile,
      metaData,
      jpgQuality,
      progressive,
      normalizeRotation,
      preFix,
      postFix,
      dpi,
      compression,
    },
    settingIds = [],
  } = order;

  return (
    <>
      <div className="header-page">
        <h2>
          {order.orderId
            ? 'Update Specification Order'
            : 'Create Specification Order'}
        </h2>
        <div>
          <Select
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
      <Row gutter={[24, 0]}>
        <Col span="6">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Order Name</div>
            <div className="basic-setting__control">
              <Input
                value={order.orderName}
                onChange={({ target: { value } }) =>
                  onChange('orderName', value)
                }
                size="small"
                style={{ width: 150 }}
              />
            </div>
          </div>
        </Col>
        <Col span="6">
          <div className="basic-setting__item">
            <div className="basic-setting__label">Image Link</div>
            <div className="basic-setting__control">
              <Input
                value={order.imgLink}
                onChange={({ target: { value } }) => onChange('imgLink', value)}
                size="small"
                style={{ width: 150 }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col span={10}>
          <Row>
            <Col span="24">
              <Divider orientation="left">Upload Images</Divider>
            </Col>
            <Col span="24">
              <UploadButton onChange={onAddFiles} />
            </Col>
            <Col span={24}>
              <div className="img-container">
                {imageSelectedIndex !== -1 && (
                  <div className="img-view">
                    <ANTDImage
                      src={order.images[imageSelectedIndex].base64}
                      fallback="data:image/png;base64,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"
                    />
                    <Button
                      className="btn-add-comment"
                      size="small"
                      onClick={onOpenModalImageComment}
                      icon={<CommentOutlined />}
                    >
                      Add Comment
                    </Button>
                  </div>
                )}
                {order.images && order.images.length ? (
                  <div className="img-price">
                    <div className="img-price__usd">
                      {order.prices || '$1.45'}
                    </div>
                    <div>per/image</div>
                  </div>
                ) : null}
                <div className="img-list">
                  {order.images.map((img, index) => {
                    return (
                      <div className="img-item" key={index}>
                        <ANTDImage
                          className={
                            index === imageSelectedIndex ? 'active' : ''
                          }
                          onClick={() => onClickImage(index)}
                          preview={false}
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
            <Col span="12">
              <div className="basic-setting__item">
                <div className="basic-setting__label">Max output file size</div>
                <div className="basic-setting__control">
                  <Select
                    value={maxOutputFileSize}
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
                    checked={normalizeRotation}
                    onChange={(val) => onChange('normalizeRotation', val)}
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
                {codes
                  .filter((code) => code.settingType === 'ADDON')
                  .map((setting, index) => (
                    <Checkbox
                      checked={settingIds.includes(setting.code)}
                      onChange={({ target: { checked } }) =>
                        onChangeAdvance(setting.code)
                      }
                      key={index}
                    >
                      {setting.formTitle}
                    </Checkbox>
                  ))}
              </div>
            </Col>
            <Col span="24">
              <Divider orientation="left">Retouch Setting</Divider>
            </Col>
            <Col span="24">
              <div className="advance-setting__list">
                {codes
                  .filter((code) => code.settingType === 'RETOUCHING')
                  .map((setting, index) => (
                    <Checkbox
                      checked={settingIds.includes(setting.code)}
                      onChange={({ target: { checked } }) =>
                        onChangeAdvance(setting.code)
                      }
                      key={index}
                    >
                      {setting.formTitle}
                    </Checkbox>
                  ))}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Button
            className="gx-mt-2"
            type="primary"
            onClick={onSubmit}
            loading={isSaving}
          >
            Submit
          </Button>
        </Col>
      </Row>
      {imageSelected && (
        <ImageComment
          imgSrc={imageSelected.base64}
          imgWidth={imageSelected.width}
          imgHeight={imageSelected.height}
          commentsList={imageSelected.comments}
          imageDrawData={imageSelected.imageDrawData}
          visible={modalImageCommentVisible}
          onCancel={() => setModalImageCommentVisible(false)}
          onOk={onImageCommentOk}
        />
      )}
    </>
  );
};
export default CreateSpecificationOrder;
