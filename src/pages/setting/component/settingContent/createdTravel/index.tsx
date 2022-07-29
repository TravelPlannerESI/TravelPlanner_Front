import CustomPagination from '@/components/CustomPagination';
import caxios from '@/util/caxios';
import { Button, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import ManageModal from './manageModal';

interface DataType {
  key: string | number;
  travelName: string;
  countryName: string;
}

const CreatedTravel = () => {
  const [travelOwnerData, setTravelOwnerData] = useState<any>({
    totalCount: 0,
    totalPages: 0,
    contentData: [],
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [detailData, setDetailData] = useState<any>();

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
      title: 'Action',
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => openModal(record)}>상세정보</Button>
        </>
      ),
    },
  ];

  const openModal = (recordData: any) => {
    setModalVisible(true);
    setDetailData(recordData);
  };

  useEffect(() => {
    caxios.get(`/setting/travel/made?size=5&page=0`).then((res) => {
      let pageData = res?.data.data;

      pageData &&
        setTravelOwnerData({
          totalCount: pageData.totalElements,
          totalPages: pageData.totalPages,
          contentData: setContentData(pageData.content),
        });
    });
  }, []);

  useEffect(() => {
    caxios.get(`/setting/travel/made?size=5&page=${page - 1}`).then((res) => {
      let pageData = res?.data.data;

      pageData &&
        setTravelOwnerData({
          totalCount: pageData.totalElements,
          totalPages: pageData.totalPages,
          contentData: setContentData(pageData.content),
        });
    });
  }, [page]);

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
          inviteCode: d.inviteCode,
        },
      ];
    });

    return newData;
  };

  // 내가 만든 여행
  const CreatedByLoginUserTables = () => {
    return (
      <>
        <Table
          columns={columns}
          dataSource={travelOwnerData.contentData}
          rowKey={(item) => item.key}
          style={{ width: '90%' }}
          pagination={false}
        />
        {travelOwnerData.totalCount ? (
          <CustomPagination
            currentPage={page}
            setPage={setPage}
            pageCount={5}
            totalPage={travelOwnerData.totalPages}
          />
        ) : (
          <Spin />
        )}
      </>
    );
  };

  return (
    <div>
      <p>내가 만든 여행</p>
      {<CreatedByLoginUserTables />}

      <div>
        {detailData && (
          <ManageModal
            detailData={detailData}
            setDetailData={setDetailData}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
      </div>
    </div>
  );
};

export default CreatedTravel;
