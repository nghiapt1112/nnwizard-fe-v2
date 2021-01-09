import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Dropdown,
  Menu,
  Modal,
  notification,
  Popconfirm,
  Row,
  Space,
  Table,
} from 'antd';
import FormTemplate from './components/FormTemplate';
import SpecificationTemplate from './components/SpecificationTemplate';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { templateService } from '../../services';
import {
  ANT_TABLE_PAGINATION_DEFAULT,
  PAGINATION,
  TEMPLATE_TYPE,
} from '../../constants';
import { settingService } from '../../services/setting.service';
import './styles.less';
import { calculatorPrice } from '../Order/priceHelper';

const ADVANCE_SETTINGS = ['ADVANCE', 'ADDON', 'RETOUCHING', 'BASE_PRICE'];

const Template = () => {
  const [templateType, setTemplateType] = useState(TEMPLATE_TYPE.GENERAL);
  const [isLoadingData, setLoadingData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addCount, setAddCount] = useState(0);
  const [formModalData, setFormModalData] = useState({});
  const [data, setData] = useState([]);
  const [advanceSetting, setAdvanceSetting] = useState([]);
  const [priceHolder, setPriceHolder] = useState({});
  const [price, setPrice] = useState(0);
  const [searchParams, setSearchParams] = useState({
    page: PAGINATION.PAGE_START,
    size: PAGINATION.PAGE_SIZE,
  });
  const [pagination, setPagination] = useState({
    current: 0,
    total: 0,
  });

  useEffect(() => {
    async function fetchSettings() {
      const res = await settingService.getAll({
        page: 1,
        size: 10000,
        types: [...ADVANCE_SETTINGS, 'BASIC'], // lay ca basic va advance , tuy theo tung loai xu ly anh.
        // orderTypes: ['GENERAL', 'REAL_ESTATE'], // loai xu ly anh dang la GENERAL + REAL_ESTATE
      });
      const advanceVal = getAdvanceSettingFormValue(res);
      setAdvanceSetting(advanceVal);
      const priceHolderVal = {};
      advanceVal.forEach(
        (setting) => (priceHolderVal[setting.value] = setting.price)
      );
      setPriceHolder(priceHolderVal);
    }

    function getAdvanceSettingFormValue(res) {
      return res.content
        .filter((el) => ADVANCE_SETTINGS.includes(el.settingType))
        .map((el) => {
          return {
            value: el.code,
            text: el.formTitle || el.code,
            price: el.price,
            type: el.settingType,
          };
        });
    }

    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const res = await templateService.getAll(searchParams);
        setLoadingData(false);
        const { content, totalElements, number } = res;
        content.filter((el) => !el.price).forEach((el) => (el.price = 0));
        setData(content);
        setPagination({
          total: totalElements,
          current: number + 1,
        });
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [searchParams, addCount]);

  const onTableChange = ({ current }) => {
    setSearchParams({
      ...searchParams,
      page: current,
    });
  };
  const onConfirmDelete = async ({ tid }) => {
    try {
      await templateService.delete({ ids: [tid] });
      setAddCount(addCount + 1);
      notification.success({
        message: 'Delete Template Successfully',
      });
    } catch (error) {
      notification.error({
        message: error,
      });
    }
  };
  const openAddModal = ({ key }) => {
    setTemplateType(key);
    setFormModalData({});
    setModalVisible(true);
  };
  const openEditModal = async ({ tid }) => {
    setLoadingData(true);
    try {
      const res = await templateService.getById(tid);
      const { basicSetting, settingIds, ...rest } = res;
      debugger;
      const margin =
        basicSetting?.margin_top ||
        basicSetting?.margin_bottom ||
        basicSetting?.margin_left ||
        basicSetting?.margin_right;
      const codes = {};
      (settingIds || []).forEach((el) => (codes[el] = true));
      setFormModalData({
        ...basicSetting,
        ...rest,
        codes,
        margin,
      });
      setModalVisible(true);
    } catch (error) {
      notification.error({
        message: error,
      });
    } finally {
      setLoadingData(false);
    }
  };
  const onChangeBasic = (key, value) => {
    const tmpFormModalData = { ...formModalData };
    tmpFormModalData[key] = value;
    setFormModalData(tmpFormModalData);
  };

  const onChangeAdvance = (key, value) => {
    debugger;
    const tmpFormModalData = { ...formModalData };
    tmpFormModalData.codes = tmpFormModalData.codes || {};
    tmpFormModalData.settingIds = tmpFormModalData.settingIds || [];
    tmpFormModalData.codes[key] = value;
    tmpFormModalData.settingIds = Object.keys(tmpFormModalData.codes).filter(
      (key) => tmpFormModalData.codes[key]
    );
    setFormModalData(tmpFormModalData);
    // TODO: Tính tiền, mỗi 1 item đã có price đi kèm, giờ thì count tính tiền. :))
    const prize = calculatorPrice(priceHolder, tmpFormModalData.settingIds);
    console.log('calculated price', prize);
  };

  const handleModalOk = async () => {
    try {
      const { tid, name, ...rest } = formModalData;
      const ids = Object.keys(formModalData.codes || []);
      const payload = {
        tid,
        name: name,
        // type: templateType,
        type: 'PRODUCT',
        basicSetting: { ...rest },
        settingIds: ids,
      };

      const isAddNew = !tid;
      isAddNew
        ? await templateService.create(payload)
        : await templateService.update(payload);
      setModalVisible(false);
      setAddCount(addCount + 1);
      notification.success({
        message: `${isAddNew ? 'Add' : 'Update'} Template Successfully`,
      });
    } catch (error) {
      notification.error({
        message: error,
      });
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: 'Template Type',
      dataIndex: 'tid',
      width: '30%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'tid',
      width: '20%',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            size="small"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this template?"
            onConfirm={() => onConfirmDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const generatorTemplate = (
    advanceSetting,
    formModalData,
    onChangeBasic,
    onChangeAdvance
  ) => {
    switch (templateType) {
      case TEMPLATE_TYPE.REAL_ESTATE:
        return (
          <FormTemplate
            advanceSetting={advanceSetting}
            price={price}
            data={formModalData}
            onChange={onChangeBasic}
            onChangeAdvance={onChangeAdvance}
          />
        );
      case TEMPLATE_TYPE.GENERAL:
        return (
          <SpecificationTemplate
            advanceSetting={advanceSetting}
            price={price}
            data={formModalData}
            onChange={onChangeBasic}
            onChangeAdvance={onChangeAdvance}
          />
        );
      default:
        return (
          <FormTemplate
            advanceSetting={advanceSetting}
            price={price}
            data={formModalData}
            onChange={onChangeBasic}
            onChangeAdvance={onChangeAdvance}
          />
        );
    }
  };
  return (
    <>
      <div className="page-header">
        <h2>Template</h2>
        <Dropdown
          overlay={() => {
            return (
              <Menu onClick={openAddModal}>
                <Menu.Item
                  key={TEMPLATE_TYPE.REAL_ESTATE}
                  icon={<PlusOutlined />}
                >
                  Real Estate
                </Menu.Item>
                <Menu.Item key={TEMPLATE_TYPE.GENERAL} icon={<PlusOutlined />}>
                  Specification
                </Menu.Item>
              </Menu>
            );
          }}
        >
          <Button type="primary">
            Add Template <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Table
            rowKey="tid"
            loading={isLoadingData}
            columns={columns}
            dataSource={data}
            pagination={{
              ...ANT_TABLE_PAGINATION_DEFAULT,
              ...pagination,
            }}
            onChange={onTableChange}
          />
        </Col>
        <Modal
          centered
          title={formModalData.tid ? 'Edit Template' : 'Add Template'}
          visible={modalVisible}
          onOk={handleModalOk}
          onCancel={() => setModalVisible(false)}
          width={980}
        >
          {generatorTemplate(
            advanceSetting,
            formModalData,
            onChangeBasic,
            onChangeAdvance
          )}
        </Modal>
      </Row>
    </>
  );
};

export default Template;
