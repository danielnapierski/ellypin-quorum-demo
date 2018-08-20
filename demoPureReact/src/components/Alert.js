import React from 'react';
import { Alert } from 'antd';

const onClose = function (e) {
  console.log(e, 'I was closed.');
};

const AlertBox = (message) => {
  <div>
    <Alert
      message="Invalid Format, Please Fix Before Transaction"
      description={message}
      type="error"
      closable
      onClose={onClose}
    />
  </div>
}

export default AlertBox;