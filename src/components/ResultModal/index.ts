import { Modal } from 'antd';
import React, { useState } from 'react';

export const success = (inviteCode: string) => {
  Modal.success({
    content: { inviteCode },
  });
};

export const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
};
