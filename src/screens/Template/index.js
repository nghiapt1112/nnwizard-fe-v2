import React, {useEffect, useState} from "react";
import {Button, Col, Modal, notification, Popconfirm, Row, Space, Table} from "antd";
import FormTemplate from "./components/FormTemplate";
import {PlusOutlined} from "@ant-design/icons";
import {templateService} from "../../services";
import './styles.less';
import {ANT_TABLE_PAGINATION_DEFAULT, PAGINATION} from "../../constants";

const Template = () => {
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
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      const res = await templateService.getAll(searchParams);
      setLoadingData(false);
      const {content, totalElements, number} = res;
      setData(content);
      setPagination({
        total: totalElements,
        current: number + 1,
      })
    }

    fetchData();
  }, [searchParams, addCount]);

  const onTableChange = ({current}) => {
    setSearchParams({
      ...searchParams,
      page: current,
    })
  }
  const onConfirmDelete = async ({tid}) => {
    try {
      await templateService.delete({ids: [tid]});
      setAddCount(addCount + 1);
      notification.success({
        message: 'Delete Template Successfully'
      })
    } catch (error) {
      notification.error({
        message: error
      })
    }
  }
  const openAddModal = () => {
    setFormModalData({});
    setModalVisible(true);
  }
  const openEditModal = async ({tid}) => {
    try {
      setLoadingData(true);
      const res = await templateService.getById(tid);
      setLoadingData(false);
      const {setting, ...rest} = res;
      const margin = setting.margin_top || setting.margin_bottom || setting.margin_left || setting.margin_right;
      setFormModalData({
        ...setting,
        ...rest,
        margin,
      });
      setModalVisible(true);
    } catch (error) {
      setLoadingData(false);
      notification.error({
        message: error,
      })
    }
  }
  const onChangeBasic = (key, value) => {
    const tmpFormModalData = {...formModalData};
    tmpFormModalData[key] = value;
    setFormModalData(tmpFormModalData);
  }
  const onChangeAdvance = (key, value) => {
    const tmpFormModalData = {...formModalData};
    tmpFormModalData.codes = tmpFormModalData.codes || {};
    tmpFormModalData.codes[key] = value;
    setFormModalData(tmpFormModalData);
  }
  const handleModalOk = async () => {
    try {
      const {tid, name, requestType, ...rest} = formModalData;
      const payload = {
        tid,
        name: name,
        requestType: requestType,
        setting: {...rest}
      }
      const isAddNew = !tid;
      isAddNew ? await templateService.create(payload) : await templateService.update(payload);
      setModalVisible(false);
      setAddCount(addCount + 1);
      notification.success({
        message: `${isAddNew ? 'Add' : 'Update'} Template Successfully`,
      })
    } catch (error) {
      notification.error({
        message: error,
      })
    }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '40%',
    },
    {
      title: 'Template Type',
      dataIndex: 'tid',
      width: '40%',
    },
    {
      title: 'Action',
      dataIndex: 'tid',
      width: '20%',
      align: 'center',
      render: (_, record) => (
        <Space
          size="middle">
          <Button type="link" size="small" onClick={() => openEditModal(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure delete this template?"
            onConfirm={() => onConfirmDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger size="small">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <h2>Template</h2>
        <Button
          onClick={openAddModal}
          type="primary"
          icon={<PlusOutlined/>}
        >Add Template</Button>
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
              ...pagination
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
          <FormTemplate
            data={formModalData}
            onChange={onChangeBasic}
            onChangeAdvance={onChangeAdvance}
          />
        </Modal>
      </Row>
    </>
  )
}

export default Template;
