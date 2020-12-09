import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Modal,
  notification,
  Popconfirm,
  Row,
  Space,
  Table,
} from 'antd';
import MasterDataForm from './components/MasterDataForm';
import { PlusOutlined } from '@ant-design/icons';
import { masterDataService } from '../../services';
import './styles.less';
import { ANT_TABLE_PAGINATION_DEFAULT, PAGINATION } from '../../constants';

const MasterData = () => {
  const [isLoadingData, setLoadingData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addCount, setAddCount] = useState(0);
  const [formModalData, setFormModalData] = useState({});
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    page: PAGINATION.PAGE_START,
    size: PAGINATION.PAGE_SIZE,
  });
  const [pagination, setPagination] = useState({
    current: 0,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      const res = await masterDataService.getAll(searchParams);
      setLoadingData(false);
      const { content, totalElements, number } = res;
      setData(content);
      setPagination({
        total: totalElements,
        pageSize: totalElements,
        current: number + 1,
      });
    };

    fetchData();
  }, [searchParams, addCount]);

  const onTableChange = ({ current }) => {
    setSearchParams({
      ...searchParams,
      page: current,
    });
  };
  const onConfirmDelete = async ({ id }) => {
    try {
      await masterDataService.delete({ ids: [id] });
      setAddCount(addCount + 1);
      notification.success({
        message: 'Delete the configuration  Successfully',
      });
    } catch (error) {
      notification.error({
        message: error,
      });
    }
  };
  const openAddModal = () => {
    setFormModalData({});
    setModalVisible(true);
  };
  const openEditModal = async ({ id }) => {
    try {
      setLoadingData(true);
      const res = await masterDataService.findById(id);
      setLoadingData(false);
      setFormModalData({
        id: res.id,
        code: res.code,
        dataType: res.dataType,
        price: res.price,
        requestType: res.requestType,
        formTitle: res.formTitle || res.code,
        value: res.value,
      });
      setModalVisible(true);
    } catch (error) {
      setLoadingData(false);
      notification.error({
        message: error,
      });
    }
  };

  const onChangeBasic = (key, value) => {
    const tmpFormModalData = { ...formModalData };
    tmpFormModalData[key] = value;
    setFormModalData(tmpFormModalData);
  };
  const onChangeAdvance = (key, value) => {
    const tmpFormModalData = { ...formModalData };
    tmpFormModalData.codes = tmpFormModalData.codes || {};
    tmpFormModalData.codes[key] = value;
    setFormModalData(tmpFormModalData);
  };
  const handleModalOk = async () => {
    try {
      const {
        id,
        code,
        dataType,
        requestType,
        price,
        formTitle,
        ...rest
      } = formModalData;
      console.log(formModalData);
      const payload = {
        id,
        code,
        dataType,
        requestType,
        price,
        formTitle,
        setting: { ...rest },
      };
      const isAddNew = !id;
      isAddNew
        ? await masterDataService.create(payload)
        : await masterDataService.update(id, payload);
      setModalVisible(false);
      setAddCount(addCount + 1);
      notification.success({
        message: `${isAddNew ? 'Add' : 'Update'} Configuration Successfully`,
      });
    } catch (error) {
      notification.error({
        message: error,
      });
    }
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      width: '20%',
    },
    {
      title: 'Title',
      dataIndex: 'formTitle',
      width: '20%',
    },
    {
      title: 'Data Type',
      dataIndex: 'dataType',
      width: '20%',
    },
    {
      title: 'Request Type',
      dataIndex: 'requestType',
      width: '20%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
    },
    {
      title: 'Action',
      dataIndex: 'id',
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
  return (
    <>
      <div className="page-header">
        <h2>Master Data</h2>
        <Button onClick={openAddModal} type="primary" icon={<PlusOutlined />}>
          Create new config
        </Button>
      </div>
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            rowKey="id"
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
          title="Edit Template"
          visible={modalVisible}
          onOk={handleModalOk}
          onCancel={() => setModalVisible(false)}
          width={980}
        >
          <MasterDataForm
            data={formModalData}
            onChange={onChangeBasic}
            onChangeAdvance={onChangeAdvance}
          />
        </Modal>
      </Row>
    </>
  );
};

export default MasterData;
