import CustomPagination from '@/components/CustomPagination';
import caxios from '@/util/caxios';
import { Button, message, Popconfirm, Popover, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { joinStatusName } from '../utils';

interface DataType {
  key: string | number;
  travelName: string;
  countryName: string;
  createdBy: string;
  joinStatus: string;
}

const InvitedTravel = () => {
  const [invitedTravelData, setInvitedTravelData] = useState<any>({
    totalCount: 0,
    totalPages: 0,
    contentData: [],
  });
  const [page, setPage] = useState<number>(1);

  const columns: ColumnsType<DataType> = [
    {
      title: '여행명',
      dataIndex: 'travelName',
      key: 'travelName',
    },
    {
      title: '여행지',
      dataIndex: 'countryName',
      key: 'countryName',
    },
    {
      title: '여행 팀장',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: '초대 응답 현황',
      dataIndex: 'joinStatusNm',
      key: 'joinStatusNm',
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <>
          {record.joinStatus === 'EMPTY' ? (
            <Popover content={<PopupContent record={record} />} title="Title" trigger="click">
              <Button>수락/거절</Button>
            </Popover>
          ) : (
            <div>응답 했습니다.</div>
          )}
        </>
      ),
    },
  ];

  const PopupContent = (data: any) => {
    return (
      <div style={{ height: '40px' }}>
        <Button
          style={{ float: 'left' }}
          onClick={() => handleResponseInvitation(data.record, 'YES')}
        >
          수락
        </Button>
        <Button
          style={{ float: 'right' }}
          onClick={() => handleResponseInvitation(data.record, 'NO')}
        >
          거절
        </Button>
      </div>
    );
  };

  const handleResponseInvitation = (rowData: any, type: string) => {
    let data = {
      joinStatus: type,
    };

    caxios.put(`/setting/travel/${rowData.inviteCode}/response`, data).then((res) => {
      console.log(res);
      getContentData(0);
      message.success(res.data.resultMsg);
    });
  };

  useEffect(() => {
    getContentData(0);
  }, []);

  useEffect(() => {
    getContentData(page - 1);
  }, [page]);

  const getContentData = (pageNum: any) => {
    caxios.get(`/setting/travel/invited?size=5&page=${pageNum}`).then((res) => {
      let pageData = res?.data.data;
      // console.log(pageData);

      pageData &&
        setInvitedTravelData({
          totalCount: pageData.totalElements,
          totalPages: pageData.totalPages,
          contentData: setContentData(pageData.content),
        });
    });
  };
  const setContentData = (data: any) => {
    let newData: any = [];
    data?.map((d: any) => {
      newData = [
        ...newData,
        {
          key: d.travelId,
          travelId: d.travelId,
          travelName: d.travelName,
          countryName: d.countryName,
          createdBy: d.createdBy,
          inviteCode: d.inviteCode,
          joinStatus: d.joinStatus,
          joinStatusNm: joinStatusName(d.joinStatus),
        },
      ];
    });

    return newData;
  };

  // 초대된 여행
  const InvitedTables = () => {
    return (
      <>
        <Table
          columns={columns}
          dataSource={invitedTravelData.contentData}
          rowKey={(item) => item.key}
          style={{ width: '90%' }}
          pagination={false}
        />
        {invitedTravelData.totalCount ? (
          <CustomPagination
            currentPage={page}
            setPage={setPage}
            pageCount={5}
            totalPage={invitedTravelData.totalPages}
          />
        ) : (
          <Spin />
        )}
      </>
    );
  };

  return (
    <div>
      <p>내가 만들지 않고 초대된 여행</p>
      {<InvitedTables />}
      <div></div>
    </div>
  );
};

export default InvitedTravel;
