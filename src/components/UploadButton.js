import React, { useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const UploadButton = ({ title = 'Upload Files ...', onChange }) => {
  const inputFiles = useRef(null);
  return (
    <>
      <Button
        onClick={() => inputFiles.current.click()}
        type="primary"
        icon={<PlusOutlined />}
      >
        {title}
      </Button>
      <input
        multiple
        accept="image/*"
        onChange={onChange}
        ref={inputFiles}
        type="file"
        style={{ display: 'none' }}
      />
    </>
  );
};
export default UploadButton;
