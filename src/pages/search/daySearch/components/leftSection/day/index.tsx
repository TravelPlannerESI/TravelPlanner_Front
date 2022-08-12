import SearchBox from '@/components/GoogleMap/SearchBox';
import caxios from '@/util/caxios';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { getZoom } from '../../../utils';
import styles from './index.less';

const Day = ({
  locMarker,
  setLocMarker,
  setHasPrevious,
  detailForm,
  openDetail,
  setOpenDetail,
  setPlanDetail,
}: any) => {
  const [places, setPlaces] = useState<any>(); // 검색 결과 리스트를 담는다.

  const substr = (val: string) => {
    return val.substring(5);
  };

  // 리스트를 클릭하면 지도의 위치가 바뀐다.
  const changeCurrentMap = (geometry: any) => {
    setLocMarker({
      location: [
        {
          lat: geometry?.location?.lat(),
          lng: geometry?.location?.lng(),
        },
      ],
      zoom: 17, // zoom값은 숫자가 커질수록 더 가까이 보인다.
    });
  };

  const handleAddPlan = (data: any) => {
    detailForm.resetFields();
    detailForm.setFieldsValue({
      ...detailForm.getFieldsValue(),
      destinationName: data?.name,
      lat: data.geometry.location.lat(),
      lng: data.geometry.location.lng(),
    });
  };

  // 세부 일정을 추가한다.
  const addPlans = (data: any) => {
    setHasPrevious({
      flag: true,
      method: 'insert',
    });
    handleAddPlan(data);
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

  const handlePrevious = () => {
    setOpenDetail({ open: false });

    caxios.get(`/planDetail`).then((res) => {
      const resData = res.data?.data;
      const planDetails = resData?.planDetails;
      setPlanDetail(planDetails);

      planDetails && planDetails.length !== 0
        ? planDetailLocation(planDetails)
        : navigator.geolocation.getCurrentPosition(userLocation);
    });
  };

  // 사용자가 저장한 세부 여행지의 정보가 있으면 그 위치를 marker로 표시해준다.
  const planDetailLocation = (planDetails: any) => {
    let locArr = planDetails?.map((data: any) => {
      return { lat: Number.parseFloat(data.lat), lng: Number.parseFloat(data.lng) };
    });
    setLocMarker({
      location: locArr,
      zoom: getZoom(locArr),
    });
  };

  // 최초 로딩시 사용자의 위치정보를 가져온다.
  const userLocation = ({ coords }: any) => {
    setLocMarker({
      location: [
        {
          lat: coords?.latitude,
          lng: coords?.longitude,
        },
      ],
      zoom: 16,
    });
  };

  return (
    <div>
      <div style={{ paddingTop: 8 }}>
        <Button onClick={() => handlePrevious()} shape="circle" icon={<ArrowLeftOutlined />} />
      </div>
      <div className={styles.displaySelectedDate}>
        <p>{substr(openDetail?.currentDay)}</p>
      </div>
      <div style={{ height: '30px', marginTop: '10px', marginBottom: '20px' }}>
        <SearchBox locMarker={locMarker} setLocMarker={setLocMarker} setPlaces={setPlaces} />
      </div>
      <Content />
    </div>
  );
};

export default Day;
