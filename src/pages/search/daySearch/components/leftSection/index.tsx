import GMap from '@/components/GoogleMap/GMap';
import SearchBox from '@/components/GoogleMap/SearchBox';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const LeftSection = ({ locMarker, setLocMarker, plans, setPlans }: any) => {
  const [places, setPlaces] = useState<any>(); // 검색 결과 리스트를 담는다.

  // 리스트를 클릭하면 지도의 위치가 바뀐다.
  const changeCurrentMap = (geometry: any) => {
    setLocMarker({
      location: {
        lat: geometry?.location?.lat(),
        lng: geometry?.location?.lng(),
      },
      zoom: 17, // zoom값은 숫자가 커질수록 더 가까이 보인다.
    });
  };

  // 세부 일정을 추가한다.
  const addPlans = (data: any) => {
    setPlans([...plans, { key: data?.place_id, data: data }]);
  };

  const PlanDetail = ({ data }: any) => {
    return (
      <div className={styles.planDetailContainer} onClick={() => changeCurrentMap(data?.geometry)}>
        <div className={styles.planDetailTitle}>{data?.name}</div>
        <div className={styles.planDetailAddress}>{data?.formatted_address}</div>
        <div className={styles.planTypeNSetting}>
          <div style={{ flex: 2, textAlign: 'right' }}>
            <Button shape="default" type="primary" /* type="link" */ onClick={() => addPlans(data)}>
              일정 추가
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const Content = () => {
    return (
      <div className={styles.test2} style={{ flex: 1, height: 710 }}>
        {places?.map((data: any) => {
          return <PlanDetail data={data} key={data?.place_id} />;
        })}
      </div>
    );
  };

  return (
    <div className={styles.searchLeftSection}>
      <div className={styles.displaySelectedDate}>
        <p>3.1(월)</p>
      </div>
      <div style={{ height: '30px', marginTop: '10px', marginBottom: '20px' }}>
        <GMap>
          <SearchBox locMarker={locMarker} setLocMarker={setLocMarker} setPlaces={setPlaces} />
        </GMap>
      </div>
      <Content />
    </div>
  );
};

export default LeftSection;
