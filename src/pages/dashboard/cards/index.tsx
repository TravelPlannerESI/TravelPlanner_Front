import { Card, Col, Row, Statistic } from 'antd';
import { currencyMapping } from './utils';
import styles from './index.less';

const Cards = ({ dashboard }: any) => {
  const getDate = (startDate: string) => {
    let now = new Date();
    let start = new Date(startDate);

    let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let dDay = Math.round((nowDate - start) / (1000 * 60 * 60 * 24));

    let res = '';
    if (dDay < 0) res = `${Math.abs(dDay)}일 남았습니다.`;
    else res = `${Math.abs(dDay)}일 지났습니다.`;

    return res;
  };

  const exchangeRateInfo = () => {
    console.log(dashboard);
    let exchangeRate = dashboard?.fxrt;
    let currencyUnit = dashboard?.currSgn;

    if (dashboard?.currSgn == null) {
      return '환율 정보가 없습니다.';
    } else if (currencyMapping[currencyUnit] === undefined) {
      return `1  ${currencyUnit} = ${exchangeRate}원`;
    } else {
      return `1  ${currencyMapping[currencyUnit]} = ${exchangeRate}원`;
    }
  };

  return (
    <div>
      <Row>
        <Col className={styles.cardSize}>
          <Card className={styles.card}>
            {/* ward */}
            <Statistic
              title="초기 설정/세팅 비용"
              value={dashboard?.totalCost}
              valueStyle={{ color: 'black' }}
              suffix="원"
            />
          </Card>
        </Col>

        <Col className={styles.cardSize}>
          <Card className={styles.card}>
            <Statistic
              title={'환율정보'}
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
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
