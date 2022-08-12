import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Card, Col, Row, Statistic } from 'antd';
import caxios from '@/util/caxios';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import axios from 'axios';
import request from '@/util/request';

const DashBoard: React.FC = () => {
  const [dashboard, setDashBoard] = useState<any>();

  useEffect(() => {
    caxios.get(`/travel/dashboard`).then((res) => {
      let data = res?.data?.data;
      console.log(data);
      setDashBoard(data);
    });

    // caxios
    // .get(
    //   // `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=vN8UAk24yGSIGADl19RIpyY7zxW7WC15&searchdate=20180102&data=AP01`,
    //   `/1220000/retrieveTrifFxrtInfo?serviceKey=Ku5qfW%2F3nMsFEByRJWl8Y6lXrw3YdUInk3ehIViSXKaa2CvbD00XJJYme%2FO5FbLWFheHgKQJZi257JyUG9o7SA%3D%3D&aplyBgnDt=20220807&weekFxrtTpcd=2`,
    // )
    // .then((res) => {
    //   console.log('제발');
    //   console.log(res);
    // })
    // .catch((res) => {
    //   console.log('에러');
    //   console.log(res);
    // });
  }, []);

  const getDate = (startDate: string) => {
    let now = new Date();
    let start = new Date(startDate);

    let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let dDay = Math.round((start - nowDate) / (1000 * 60 * 60 * 24));

    return dDay;
  };

  return (
    <div className={styles.content} style={{ padding: 30 }}>
      {/* <Card style={{ width: '100%', height: 150, marginBottom: 20 }}></Card> */}

      <div style={{ width: '100%', height: 50, marginBottom: 20 }}>
        <div style={{ width: '200px' }}>
          <p>{dashboard?.countryName}으로 떠나는 여행</p>
        </div>
        <div style={{ float: 'right', width: '300px' }}>
          <p>여행 명 : {dashboard?.travelName}</p>
          <p>
            여행 일정 : {dashboard?.startDate} ~ {dashboard?.endDate}
          </p>
          여긴 오른쪽에 붙을것임
        </div>
      </div>
      <Card style={{ width: '100%', height: 680, marginBottom: 20 }}>
        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={6}>
              <Card className={styles.card}>
                <Statistic
                  title="총 비용"
                  value={dashboard?.totalCost}
                  // precision={2}
                  valueStyle={{ color: 'black' }}
                  // prefix={<ArrowUpOutlined />}
                  suffix="원"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className={styles.card}>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className={styles.card}>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className={styles.card}>
                <Statistic
                  title="D-Day"
                  value={getDate(dashboard?.startDate)}
                  valueStyle={{ color: '#cf1322' }}
                  // suffix="days left"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Card>

      {/* <Card style={{ width: '100%', height: 150 }}></Card> */}
    </div>
  );
};

export default DashBoard;
