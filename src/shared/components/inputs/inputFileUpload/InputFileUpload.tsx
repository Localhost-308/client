import React, { memo } from 'react';
import Upload from 'antd/es/upload/index';
import Button from 'antd/es/button/button';
import UploadOutlined from '@ant-design/icons/lib/icons/UploadOutlined';

import styles from '../input/Input.module.css';

interface FileUploadProps {
  onChange: (file: File) => void;
  label: string;
  accept: string;
  margin?: string;
}

const InputFileUpload: React.FC<FileUploadProps> = ({ onChange, label, accept, margin }) => {
  const beforeUpload = (file: File) => {
    onChange(file);
    return false;
  };

  return (
    <div className={styles.div_input} style={{margin}}>
      <label className={styles.label_input}>{label}</label>
      <Upload 
        beforeUpload={beforeUpload}
        accept={accept}
        maxCount={1}>
        <Button icon={<UploadOutlined />}>Selecionar arquivo</Button>
      </Upload>
    </div>
  );
};

export default memo(InputFileUpload);
