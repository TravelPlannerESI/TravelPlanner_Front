import caxios from '@/util/caxios';
import { Button, Input, message, notification, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Table, { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { joinStatusName } from '../../utils';

interface DataType {
  key: string | number;
  email: string;
  name: string;
  joinStatus: string;
}

const ManageModal = ({ detailData, setDetailData, modalVisible, setModalVisible }: any) => {
  const [emailInfo, setEmailInfo] = useState<any>([]);
  const [invitedMembers, setInvitedMembers] = useState<any>();
  const [saveMembers, setSaveMembers] = useState<any>();

  const columns: ColumnsType<DataType> = [
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '이름',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '초대 결과',
      render: (e) =>
        e.joinStatusCd !== 'NO' ? (
          <>{e.joinStatusNm}</>
        ) : (
          <>
            {e.joinStatusNm}{' '}
            <Button
              style={{ float: 'right' }}
              type={'primary'}
              onClick={() => handleResend(e.email)}
            >
              재전송
            </Button>
          </>
        ),
    },
  ];

  const handleResend = (email: string) => {
    let data = {
      inviteCode: detailData?.inviteCode,
      joinStatus: 'EMPTY',
      email: email,
    };
    console.log(data);
    caxios.put(`/setting/travel/${detailData.inviteCode}/resend`, data).then((res) => {
      console.log(res);
      getMemberList();
    });
  };

  useEffect(() => {
    console.log(detailData);
    getMemberList();
  }, []);

  // Table에 여행 초대된 멤버들의 데이터를 뿌려준다.
  const getMemberList = () => {
    caxios.get(`/setting/travel/members/${detailData.travelId}`).then((res) => {
      let memberList = res?.data.data;
      setMemberList(memberList);
    });
  };

  // 초대된 멤버들 데이터 세팅
  const setMemberList = (memberList: any) => {
    let newMembers: any = [];
    memberList &&
      memberList?.map((data: any) => {
        newMembers = [
          ...newMembers,
          {
            email: data.email,
            userName: data.userName,
            joinStatusCd: data.joinStatus,
            joinStatusNm: joinStatusName(data.joinStatus),
          },
        ];
      });
    setInvitedMembers(newMembers);
  };

  // 새롭게 초대할 사용자를 검색한다.
  const handleKeyUp = (e: any) => {
    let keyword = e.target.value.trim();

    let emailList = invitedMembers.map((data: any) => data.email);

    keyword &&
      caxios.get(`/setting/travel/users/${keyword}?invitedMembers=${emailList}`).then((res) => {
        let emailList = res?.data?.data;
        setEmailInfo(emailList);
      });
  };

  const onClose = () => {
    setModalVisible(false);
    setDetailData(null);
  };

  const handleSave = () => {
    console.log('저장');
    if (saveMembers === undefined) {
      notification.open({
        message: '추가할 회원의 이메일을 선택해주세요.',
        duration: 1.5,
      });
    } else {
      caxios.post(`/setting/travel/members/add/${detailData.travelId}`, saveMembers).then((res) => {
        console.log(res);
        if (res.status === 201) {
          getMemberList();
          setSaveMembers(undefined);
          message.success(res.data.resultMsg);
        }
      });
    }
  };

  return (
    <Modal
      visible={modalVisible}
      onCancel={onClose}
      width={'1000px'}
      title={`여행명 : ${detailData.travelName}`}
      // onOk={() => console.log(1)}
      footer={[
        <Button key="back" onClick={() => setModalVisible(false)}>
          확인
        </Button>,
      ]}
    >
      <div>
        초대 코드
        <br />
        <Input readOnly={true} defaultValue={detailData.inviteCode} style={{ width: '60%' }} />
        <CopyToClipboard text={detailData.inviteCode}>
          <Button type="primary"> 복사 </Button>
        </CopyToClipboard>
      </div>
      <br />
      <div>
        <p>기존 멤버</p>
        <div>
          <Table
            columns={columns}
            dataSource={invitedMembers}
            rowKey={(item) => item.email}
            pagination={false}
            style={{ height: '350px', overflowY: 'auto' }}
          />
        </div>
      </div>

      <br />

      <div>
        <div>
          멤버 추가
          <Button style={{ float: 'right' }} type={'primary'} onClick={handleSave}>
            추가
          </Button>
        </div>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="select one country"
          onKeyUp={(e) => handleKeyUp(e)}
          onChange={(e) => setSaveMembers(e)}
          optionLabelProp="label"
          value={saveMembers}
        >
          {emailInfo?.map((mail: any, idx: number) => (
            <Select.Option value={mail} label={mail} key={mail}>
              <div className="demo-option-label-item">{mail}</div>
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default ManageModal;
