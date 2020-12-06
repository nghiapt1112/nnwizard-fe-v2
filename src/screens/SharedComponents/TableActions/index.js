import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Button, Popconfirm, Space} from "antd";

const TableActions = (val, record) => {
    const openEditModal = async ({tid}) => {
        console.log("openEditModal:", tid)
    }
    const onConfirmDelete = async ({tid}) => {
        console.log("openEditModal:", tid)
    }
    return (<>
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
    </>)
}
TableActions.propTypes = {
    val: PropTypes.object,
    record: PropTypes.object
};

export default TableActions;
