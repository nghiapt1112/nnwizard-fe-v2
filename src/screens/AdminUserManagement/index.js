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
import AdminCreateUserForm from './components/FormComponent';
import { PlusOutlined } from '@ant-design/icons';
import {
  adminRoleService,
  adminUserService,
  masterDataService,
} from '../../services';
import './styles.less';
import { ANT_TABLE_PAGINATION_DEFAULT, PAGINATION } from '../../constants';

const UserManagement = () => {
  const [isLoadingData, setLoadingData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addCount, setAddCount] = useState(0);
  const [formModalData, setFormModalData] = useState({});
  const [roles, setRoles] = useState([]);
  const [data, setData] = useState([]);
  const [enabledEmail, setEnabledEmail] = useState(true);
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
      try {
        const res = await adminUserService.findAllUsers(searchParams);
        const rolesRes = await adminRoleService.findAllRoles();
        setLoadingData(false);
        const { content, totalElements, number } = res;
        content.forEach((el) => (el.roles = el.roles.join(',')));
        setRoles([...rolesRes]);
        setData(content);
        setPagination({
          total: totalElements,
          current: number + 1,
        });
      } catch (error) {
        notification.error({
          message: error,
        });
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
  const onConfirmDelete = async ({ id }) => {
    try {
      await masterDataService.delete({ ids: [id] });
      setAddCount(addCount + 1);
      notification.success({
        message: 'Delete User Successfully',
      });
    } catch (error) {
      notification.error({
        message: error,
      });
    }
  };
  const openAddModal = () => {
    setFormModalData({ roles: roles, userStatus: 'ENABLED', uploadLimit: 10 });
    setModalVisible(true);
  };

  const mapRoleNameToId = (rolesNames) => {
    if (!rolesNames) {
      return [];
    }
    return roles
      .filter((el) => rolesNames.includes(el.authority))
      .map((el) => el.roleId);
  };

  const openEditModal = async ({ userId }) => {
    try {
      setLoadingData(true);
      const res = await adminUserService.findDetail(userId);
      setLoadingData(false);
      const userRoleIds = mapRoleNameToId(res.roles);

      setFormModalData({
        userId: res.userId,
        email: res.email,
        signImg: res.signImg,
        fullName: res.fullName,
        roles: roles,
        roleIds: userRoleIds,
        expirationTime: res.expirationTime,
        uploadLimit: res.uploadLimit,
        type: res.type,
        userStatus: res.userStatus,
      });
      setEnabledEmail(false);
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
        email,
        fullName,
        password,
        roleIds,
        userId,
        userStatus,
        uploadLimit,
        roles,
        ...rest
      } = formModalData;
      const payload = {
        fullName,
        password,
        roleIds,
        userId,
        userStatus,
        uploadLimit,
      };
      const isAddNew = !userId;
      if (isAddNew) {
        setEnabledEmail(true);
        await adminUserService.create({ ...payload, email });
      } else {
        setEnabledEmail(false);
        await adminUserService.update(userId, payload);
      }
      setModalVisible(false);
      setAddCount(addCount + 1);
      notification.success({
        message: `${isAddNew ? 'Add' : 'Update'} User Successfully`,
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
      dataIndex: 'userId',
      width: '10%',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'userStatus',
      width: '20%',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      width: '10%',
    },
    {
      title: 'Action',
      dataIndex: 'userId',
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
        <h2>User Management</h2>
        <Button onClick={openAddModal} type="primary" icon={<PlusOutlined />}>
          Create new User
        </Button>
      </div>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Table
            rowKey="userId"
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
          onCancel={() => {
            setModalVisible(false);
            setEnabledEmail(true);
          }}
          width={980}
        >
          <AdminCreateUserForm
            data={formModalData}
            onChange={onChangeBasic}
            onChangeAdvance={onChangeAdvance}
            enabledEmail={enabledEmail}
          />
        </Modal>
      </Row>
    </>
  );
};

export default UserManagement;
