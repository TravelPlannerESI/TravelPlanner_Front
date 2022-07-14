import { ArrowLeftOutlined, DragOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const RightSection = ({ plans, setPlans }: any) => {
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);

  // 두번째 depth를 열 때, 데이터를 가져가기 위한 useState
  // handleSetting() 에서 핸들링   ||  찾아가려면   →   console.log(planDetail)   ←   복붙
  const [planDetail, setPlanDetail] = useState<any>();

  const ButtonLayout = () => {
    return hasPrevious ? (
      <div style={{ paddingTop: 8 }}>
        <Button onClick={() => setHasPrevious(false)} shape="circle" icon={<ArrowLeftOutlined />} />
      </div>
    ) : (
      <div style={{ paddingTop: 8, fontWeight: 900 }}>LIST</div>
    );
  };

  const CTag = ({ title }: any) => {
    return (
      <span
        className={styles.tag}
        style={{
          color: '#cf1322',
          background: '#fff1f0',
          borderColor: '#ffa39e',
        }}
      >
        {title}
      </span>
    );
  };

  const handleSetting = (detail: any) => {
    setHasPrevious(true);
    setPlanDetail(detail);
  };

  const mock: any = [
    {
      title: '오사카성',
      time: '11:10 ~ 12:00',
      type: '관광',
    },
    {
      title: '오사카 밥집',
      time: '11:10 ~ 12:00',
      type: '먹방',
    },
    {
      title: '오사카 야경',
      time: '11:10 ~ 12:00',
      type: '야경',
    },
  ];

  const PlanDetail = ({ planKey, data }: any) => {
    console.log('위치정보 객체는 여기를 확인하면 됩니다.');
    console.log(data);

    return (
      <div className={styles.planDetailContainer}>
        <div className={styles.planDetailTitle}>{data?.name}</div>
        <div className={styles.planDetailTime}>시간????</div>
        <div className={styles.planTypeNSetting}>
          <div style={{ flex: 3 }}>
            <CTag title={'어떡하지'} />

            {/* 태그로 쓸만 데이터가 있긴한데 배열에 여러개가 담겨있어서 잠시 주석 걸어놨습니다. */}
            {/* {data?.types.map((tag: string) => {
              return <CTag title={tag} />;
            })} */}
          </div>
          <div style={{ flex: 2, textAlign: 'right' }}>
            <Button
              shape="circle"
              type="default"
              icon={<SettingOutlined />}
              onClick={() => {
                handleSetting(data);
              }}
            />
            <Button shape="circle" type="default" icon={<DragOutlined />} />
          </div>
        </div>
      </div>
    );
  };

  const Content = () => {
    return hasPrevious ? (
      <div className={styles.test1} style={{ flex: 1, height: 790 }}>
        {console.log(planDetail)}
        <div
          style={{
            margin: '15px 2px 15px 2px',
            backgroundColor: 'white',
            borderRadius: '15px',
            height: '99%',
          }}
        >
          <br />
          {planDetail?.name}
        </div>
      </div>
    ) : (
      <div className={styles.test2} style={{ flex: 1, height: 810 }}>
        {/* mock는 임시 데이터라서 주석 걸어놓고,    plans에 담겨있는 실제 데이터 뿌려놨습니다. */}
        {/* {mock.map((data: any, index: number) => {
          return <PlanDetail plan={data} key={index} />;
        })} */}

        {plans?.map(({ key, data }: any) => {
          return <PlanDetail planKey={key} data={data} key={data?.place_id} />;
        })}
      </div>
    );
  };

  return (
    <div className={styles.searchRightSection}>
      <div
        style={{
          flex: 1,
          height: 32,
          marginBottom: 3,
          // borderBottom: '1px solid #dadce0',
          padding: '0 3px 0 3px ',
        }}
      >
        <ButtonLayout />
      </div>
      <Content />
    </div>
  );
};

export default RightSection;
