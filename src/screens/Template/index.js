import React, {useState} from "react";
import {Button, Col, Modal, Popconfirm, Row, Space, Table} from "antd";
import FormTemplate from "./components/FormTemplate";
import {PlusOutlined} from "@ant-design/icons";

const Template = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formModalData, setFormModalData] = useState({});
  const [data] = useState([
    {name: 'Templatte 1', tid: '1'},
    {name: 'Templatte 2', tid: '2'},
  ])

  const onConfirmDelete = () => {
  }
  const openEditModal = (template) => {
    setModalVisible(true);
    setFormModalData({...template});
  }
  const onFormModalChange = (key, value) => {
    const tmpFormModalData = {...formModalData}
    tmpFormModalData[key] = value;
    setFormModalData(tmpFormModalData);
  }
  const handleModalOk = () => {
    console.log(formModalData);
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Template Type',
      dataIndex: 'tid',
      key: 'tid',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space
          size="middle">
          <a href="!#" onClick={() => openEditModal(record)}>Edit</a>
          <Popconfirm
            title="Are you sure delete this template?"
            onConfirm={() => onConfirmDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <a href="!#">Delete</a>
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
          type="primary"
          icon={<PlusOutlined/>}
        >Add Template</Button>
      </div>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}/>
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
            onChange={onFormModalChange}
          />
        </Modal>
      </Row>
    </>
  )
}

export default Template;
