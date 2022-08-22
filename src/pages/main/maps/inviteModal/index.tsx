import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { createContext } from 'react';

const InviteModal: any = ({ invite, setInvite }: any) => {
  const accept = () => {};

  const reject = () => {
    setInvite({
      visible: false,
      travelName: null,
      travelId: null,
      startDate: null,
      endDate: null,
      email: null,
    });
  };

  return (
    <Modal
      title="여행에 초대되었습니다."
      visible={true}
      onCancel={() => {
        Modal.confirm({
          title: '거절처리 됩니다.',
          icon: <ExclamationCircleOutlined />,
          okText: '네',
          cancelText: '잠시만요',
          onOk: () => reject(),
        });
      }}
      footer={[
        <Button key="accept" type="primary" onClick={accept}>
          수락
        </Button>,
        <Button key="reject" type="primary" danger onClick={reject}>
          거절
        </Button>,
      ]}
    >
      <p style={{ fontWeight: 800 }}>초대자 : {invite?.email}</p>
      <p style={{ fontWeight: 800 }}>여행명 : {invite?.travelName}</p>
      <p style={{ fontWeight: 800 }}>
        일정 : {invite?.startDate} ~ {invite?.endDate}
      </p>
    </Modal>
  );
};

export default InviteModal;
