import React from 'react'
import { Button, notification } from 'antd';

const close = () => {
  console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

const openNotification = (message) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification.open({
    message: 'Plese fix the error first',
    description: message,
    btn,
    key,
    onClose: close,
  });
};

export default openNotification;