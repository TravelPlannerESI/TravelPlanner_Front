import caxios from '@/util/caxios';
import { getZoom } from '../../utils';
import Day from './day';
import styles from './index.less';

const LeftSection = ({
  locMarker,
  setLocMarker,
  setHasPrevious,
  detailForm,
  planData,
  openDetail,
  setOpenDetail,
  setPlanDetail,
}: any) => {
  const substr = (val: string) => {
    return val.substring(5);
  };

  const showDetailPlan = (data: any) => {
    setOpenDetail({
      open: true,
      planId: data.planId,
      day: data.days,
      currentDay: data.currentDay,
    });
    handleChangePlanDetail(data.planId);
  };

  const handleChangePlanDetail = async (planId: any) => {
    caxios.get(`/planDetail/${planId}`).then((res) => {
      setPlanDetail(res.data.data);
      res.data.data && res.data.data.length !== 0
        ? planDetailLocation(res.data.data)
        : navigator.geolocation.getCurrentPosition(userLocation);
    });
  };

  // 최초 로딩시 사용자의 위치정보를 가져온다.
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
      location: {
        lat: coords?.latitude,
        lng: coords?.longitude,
      },
      zoom: 16,
    });
  };

  const PlanDetail = ({ data }: any) => {
    return (
      <div className={styles.planDetailContainer} onClick={() => showDetailPlan(data)}>
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
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
          setPlanDetail={setPlanDetail}
        />
      )}
    </div>
  );
};

export default LeftSection;
