import React, {useRef} from "react";
import {Button, Col, Row} from 'antd';
import UploadingItem from "./UploadingItem";
import {PlusOutlined} from '@ant-design/icons';

const Uploading = ({
                     files,
                     onAddFiles,
                     onDeleteFile,
                   }) => {
  const inputFiles = useRef(null);
  return (
    <>
      <Row gutter={[0, 12]}>
        <Col span="24">
          <Button
            onClick={() => inputFiles.current.click()}
            type="primary"
            icon={<PlusOutlined/>}
          >
            Upload Files ...
          </Button>
          <input
            multiple
            accept="image/*"
            onChange={onAddFiles}
            ref={inputFiles}
            type="file"
            style={{display: 'none'}}/>
        </Col>
      </Row>
      {files.map((file, index) => {
        return (
          <UploadingItem
            key={index}
            file={file}
            onDeleteFile={() => onDeleteFile(index)}
          />
        )
      })}
    </>
  )
}
export default Uploading;
