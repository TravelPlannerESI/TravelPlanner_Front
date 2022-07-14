import React, { useEffect, useState } from 'react';
import LeftSection from '../components/leftSection';
import MiddleSection from '../components/middleSection';
import RightSection from '../components/rightSection';
import styles from './index.less';

const Container = () => {
  const [locMarker, setLocMarker] = useState<any>(); // 지도에 marker를 찍기위한 좌표정보를 담는다.
  const [plans, setPlans] = useState<any>([]); // "일정 추가" 버튼 클릭시 배열에 추가

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(userLocation);
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
        plans={plans}
        setPlans={setPlans}
      />
      <MiddleSection locMarker={locMarker} />
      <RightSection plans={plans} setPlans={setPlans} />
    </div>
  );
};

export default Container;
