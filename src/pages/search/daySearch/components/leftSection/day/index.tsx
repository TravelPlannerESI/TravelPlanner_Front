import SearchBox from '@/components/GoogleMap/SearchBox';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const Day = ({
  locMarker,
  setLocMarker,
  setHasPrevious,
  detailForm,
  openDetail,
  setOpenDetail,
}: any) => {
  const [places, setPlaces] = useState<any>(); // 검색 결과 리스트를 담는다.

  const substr = (val: string) => {
    return val.substring(5);
  };

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

  return (
    <div>
      <div style={{ paddingTop: 8 }}>
        <Button
          onClick={() => setOpenDetail({ open: false })}
          shape="circle"
          icon={<ArrowLeftOutlined />}
        />
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
