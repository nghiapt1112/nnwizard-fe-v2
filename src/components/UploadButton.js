import React, { useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// import { FILES_NEED_CONVERT } from '../utils/converts';

const ACCEPT_FILES = 'image/*, .NEF, .RAF, .DNG, .CRW, .CR2, .ARW';

// const ACCEPT_FILES = ['image/*', ...FILES_NEED_CONVERT].join(', .');

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
        accept={ACCEPT_FILES}
        onChange={onChange}
        ref={inputFiles}
        type="file"
        style={{ display: 'none' }}
      />
    </>
  );
};
export default UploadButton;
