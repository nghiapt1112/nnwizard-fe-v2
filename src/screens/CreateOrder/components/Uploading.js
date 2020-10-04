import React from "react";
import {Col, Divider, Row} from 'antd';
import UploadingItem from "./UploadingItem";
import UploadButton from "../../../components/UploadButton";

const Uploading = ({
                     files = [],
                     onAddFiles,
                     onDeleteFile,
                   }) => {
  return (
    <>
      <Row gutter={[0, 12]}>
        <Col span="24">
          <UploadButton
            onChange={onAddFiles}
          />
        </Col>
      </Row>
      <Divider orientation="left">Photos Uploading</Divider>
      <div className="uploading__list-file">
        {files.map((file, index) => {
          return (
            <UploadingItem
              key={index}
              file={file}
              onDeleteFile={() => onDeleteFile(index)}
            />
          )
        })}
      </div>
    </>
  )
}
export default Uploading;
