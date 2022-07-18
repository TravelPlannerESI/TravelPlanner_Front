import GMap from '@/components/GoogleMap/GMap';
import SearchBox from '@/components/GoogleMap/SearchBox';
import caxios from '@/util/caxios';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import Day from './day';
import styles from './index.less';

const LeftSection = ({ locMarker, setLocMarker, setHasPrevious, detailForm }: any) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const [openDetail, setOpenDetail] = useState<any>({ planId: '', open: false });
  const [planData, setPlanData] = useState<any>();

  useEffect(() => {
    // caxios.get(`/${initialState?.currentTravel}/plan`).then((res) => {
    caxios.get(`/88/plan`).then((res) => {
      let data = res?.data.data;
      console.log(data);
      setPlanData({ travelName: data.travelName, travelDate: data.travelDate, plans: data.plans });
    });
  }, []);

  const substr = (val: string) => {
    return val.substring(5);
  };

  const showSpecificPlan = (data: any) => {
    console.log(data);
    setOpenDetail({ planId: data.planId, open: true });
  };

  const PlanDetail = ({ data }: any) => {
    return (
      <div className={styles.planDetailContainer} onClick={() => showSpecificPlan(data)}>
        Day{data.days + 1} / {substr(data.currentDay)}
      </div>
    );
  };

  const Content = () => {
    return (
      <div className={styles.test2} style={{ flex: 1, height: 710 }}>
        {planData?.plans?.map((data: any) => {
          return <PlanDetail data={data} key={data?.currentDay} />;
        })}
      </div>
    );
  };

  return (
    <div className={styles.searchLeftSection}>
      {!openDetail.open ? (
        <>
          <div className={styles.displaySelectedDate}>
            <p className={styles.travelName}>{planData?.travelName}</p>
            <p style={{ fontSize: '26px' }}>{planData?.travelDate}</p>
          </div>
          <Content />
        </>
      ) : (
        <Day
          locMarker={locMarker}
          setLocMarker={setLocMarker}
          setHasPrevious={setHasPrevious}
          detailForm={detailForm}
        />
      )}
    </div>
  );
};

export default LeftSection;
