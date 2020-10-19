import React, {useEffect, useState} from "react";
import {Button, Col, notification, Popconfirm, Row, Space, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useHistory} from 'react-router-dom';
import Filter from "./components/Filter";
import {ANT_TABLE_PAGINATION_DEFAULT, PAGINATION} from "../../constants";
import {orderService} from "../../services";

const MyOrder = () => {
  const history = useHistory();
  const [isLoadingData, setLoadingData] = useState(false);
  const [addCount, setAddCount] = useState(0);
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
      try {
        setLoadingData(true);
        const res = await orderService.getAll(searchParams);
        setLoadingData(false);
        const {content, totalElements, number} = res;
        setData(content);
        setPagination({
          total: totalElements,
          current: number + 1,
        })
      } catch (error) {
        setLoadingData(false);
        console.log(error);
      }
    }

    fetchData();
  }, [searchParams, addCount]);

  const onSearchClick = (params) => {
    setSearchParams({
      ...searchParams,
      ...params,
    })
  }

  const openEditClick = async ({id}) => {
    history.push(`/update-order/${id}`)
  }
  const onConfirmDelete = async ({id}) => {
    try {
      await orderService.delete(id);
      setAddCount(addCount + 1);
      notification.success({
        message: 'Delete Order Successfully'
      })
    } catch (error) {
      notification.error({
        message: error
      })
    }
  };

  const onTableChange = ({current}) => {
    setSearchParams({
      ...searchParams,
      page: current,
    })
  }

  const columns = [
    {
      title: 'Order Name',
      dataIndex: 'name',
      width: '40%',
    },
    {
      title: 'Type',
      dataIndex: 'tid',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'tid',
      width: '20%',
      align: 'center',
      render: (_, record) => (
        <Space
          size="middle">
          <Button type="link" size="small" onClick={() => openEditClick(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure delete this order?"
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
        <h2>My Order</h2>
        <Button
          onClick={() => history.push('/create-order')}
          type="primary"
          icon={<PlusOutlined/>}
        >Create Order</Button>
      </div>
      <Filter
        onSearchClick={onSearchClick}
      />
      <Row gutter={[0, 16]} className="gx-mt-1">
        <Col span={24}>
          <Table
            rowKey="id"
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
      </Row>
    </>
  )
}

export default MyOrder;
