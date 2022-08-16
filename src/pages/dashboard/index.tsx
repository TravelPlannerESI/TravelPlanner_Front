import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Card, Col, Row, Statistic } from 'antd';
import caxios from '@/util/caxios';
import ThemeChart from './themeChart';
import Cards from './cards';
import CostChart from './costChart';

const DashBoard: React.FC = () => {
  const [dashboard, setDashBoard] = useState<any>();

  useEffect(() => {
    caxios.get(`/travel/dashboard`).then((res) => {
      let data = res?.data?.data;
      // console.log(data);
      setDashBoard(data);
    });
  }, []);

  return (
    <div className={styles.content} style={{ padding: 30 }}>
      {/* <Card style={{ width: '100%', height: 150, marginBottom: 20 }}></Card> */}

      <div
        style={{
          width: '100%',
          height: 80,
          marginBottom: 20,
          display: 'inline-flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '50%', fontSize: '35px', fontWeight: '900', paddingTop: '25px' }}>
          <p>{dashboard?.countryName}으로 떠나는 여행</p>
        </div>
        <div style={{ float: 'right', width: '500px', fontSize: '20px', fontWeight: '800' }}>
          <p>여행 명 : {dashboard?.travelName}</p>
          <p>
            여행 일정 : {dashboard?.startDate} ~ {dashboard?.endDate}
          </p>
        </div>
      </div>

      <Card style={{ width: '100%', height: 680, marginBottom: 20 }}>
        <div className="site-statistic-demo-card">
          <Cards dashboard={dashboard} />
        </div>
        <div className={styles.chartWrapper}>
          <div className={styles.chartStyle}>
            <p className={styles.chartTitle}>여행별 테마</p>
            <ThemeChart dashboard={dashboard} />
          </div>
          <div className={styles.chartStyle}>
            <p className={styles.chartTitle}>날짜별 금액</p>
            <CostChart dashboard={dashboard} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashBoard;
