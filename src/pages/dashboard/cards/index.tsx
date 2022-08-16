import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import styles from './index.less';

const Cards = ({ dashboard }: any) => {
  const getDate = (startDate: string) => {
    let now = new Date();
    let start = new Date(startDate);

    let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let dDay = Math.round((nowDate - start) / (1000 * 60 * 60 * 24));

    return dDay;
  };

  const exchangeRateInfo = () => {
    let exchangeRate = dashboard?.fxrt;
    let currencyUnit = dashboard?.mtryUtNm;
    let countryName = dashboard?.countryName;

    return `1  ${currencyUnit} = ${exchangeRate}원`;
  };

  return (
    <div>
      <Row>
        <Col className={styles.cardSize}>
          <Card className={styles.card}>
            <Statistic
              title="총 예상 비용"
              value={dashboard?.totalCost}
              valueStyle={{ color: 'black' }}
              suffix="원"
            />
          </Card>
        </Col>

        <Col className={styles.cardSize}>
          <Card className={styles.card}>
            <Statistic
              title={'환율정보 ( 1 ' + dashboard?.mtryUtNm + ')'}
              value={exchangeRateInfo()}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>

        <Col className={styles.cardSize}>
          <Card className={styles.card}>
            <Statistic
              title="D-Day"
              value={getDate(dashboard?.startDate)}
              valueStyle={{ color: '#cf1322', fontSize: 23.5 }}
              suffix={getDate(dashboard?.startDate) < 0 ? '일 남았습니다.' : '일 지났습니다.'}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
