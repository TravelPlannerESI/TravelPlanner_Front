import caxios from '@/util/caxios';
import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import LeftSection from '../components/leftSection';
import MiddleSection from '../components/middleSection';
import RightSection from '../components/rightSection';
import styles from './index.less';

const Container = () => {
  const [locMarker, setLocMarker] = useState<any>(); // 지도에 marker를 찍기위한 좌표정보를 담는다.
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [planDetail, setPlanDetail] = useState<any>();
  const [detailForm] = Form.useForm();

  const [planData, setPlanData] = useState<any>();
  const [openDetail, setOpenDetail] = useState<any>({
    open: false,
    planId: '',
    day: '',
    currentDay: '',
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(userLocation);

    // caxios.get(`/${initialState?.currentTravel}/plan`).then((res) => {
    caxios.get(`/90/plan`).then((res) => {
      let data = res?.data.data;
      setPlanData({ travelName: data.travelName, travelDate: data.travelDate, plans: data.plans });
    });

    caxios.get(`/planDetail`).then((res) => {
      const { data: resData }: any = res;
      setPlanDetail(resData?.data);
    });
  }, []);

  // 최초 로딩시 사용자의 위치정보를 가져온다.
  const userLocation = ({ coords }: any) => {
    setLocMarker({
      location: {
        lat: coords?.latitude,
        lng: coords?.longitude,
      },
      zoom: 16,
    });
  };

  return (
    <div className={styles.searchContainer}>
      <LeftSection
        locMarker={locMarker}
        setLocMarker={setLocMarker}
        setHasPrevious={setHasPrevious}
        detailForm={detailForm}
        planData={planData}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />
      <MiddleSection locMarker={locMarker} />
      <RightSection
        hasPrevious={hasPrevious}
        setHasPrevious={setHasPrevious}
        planDetail={planDetail}
        setPlanDetail={setPlanDetail}
        detailForm={detailForm}
        openDetail={openDetail}
      />
    </div>
  );
};

export default Container;
