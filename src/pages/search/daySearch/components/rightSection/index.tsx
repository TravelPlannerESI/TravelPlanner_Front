import { ArrowLeftOutlined, DragOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const RightSection = () => {
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);

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

  const handleSetting = () => {
    setHasPrevious(true);
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

  const PlanDetail = ({ plan }: any) => {
    return (
      <div className={styles.planDetailContainer}>
        <div className={styles.planDetailTitle}>{plan?.title}</div>
        <div className={styles.planDetailTime}>{plan?.time}</div>
        <div className={styles.planTypeNSetting}>
          <div style={{ flex: 3 }}>
            <CTag title={plan?.type} />
          </div>
          <div style={{ flex: 2, textAlign: 'right' }}>
            <Button
              shape="circle"
              type="default"
              icon={<SettingOutlined />}
              onClick={() => {
                handleSetting();
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
      <div className={styles.test1} style={{ flex: 1, height: 857 }}>
        <div
          style={{
            margin: '15px 2px 15px 2px',
            backgroundColor: 'white',
            borderRadius: '15px',
            height: '99%',
          }}
        ></div>
      </div>
    ) : (
      <div className={styles.test2} style={{ flex: 1, height: 857 }}>
        {mock.map((data: any) => {
          return <PlanDetail plan={data} />;
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
