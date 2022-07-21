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
}: any) => {
  const substr = (val: string) => {
    return val.substring(5);
  };

  const showDetailPlan = (data: any) => {
    console.log(data);
    setOpenDetail({
      open: true,
      planId: data.planId,
      day: data.days,
      currentDay: data.currentDay,
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
        />
      )}
    </div>
  );
};

export default LeftSection;
