import { CheckOutlined, HighlightOutlined, SmileFilled, SmileOutlined } from '@ant-design/icons';
import { Typography, Modal } from 'antd';
import React, { useState } from 'react';
const { Paragraph } = Typography;

const success = (inviteCode: string) => {
  Modal.success({
    content: <Paragraph copyable={{ text: `${inviteCode}` }}>{inviteCode}</Paragraph>,
  });
};

const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
};

const ResultModal = ({ isSuccess, inviteCode }: any) => {
  return <> {isSuccess ? success(inviteCode) : error()} </>;
};

export default ResultModal;
