import Footer from '@/components/Footer';
import { Button } from 'antd';
import React, { useState } from 'react';
import GoogleMaps from '../googlemaps';
import LoginModal from '../loginModal';
import styles from './index.less';

const Maps: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <div
          style={{
            width: '50%',
            color: 'white',
            float: 'left',
            fontWeight: '600',
            fontSize: 18,
            lineHeight: 2.9,
          }}
        >
          <img
            style={{ width: 32, height: 28, marginRight: 10, marginBottom: 7, marginLeft: 16 }}
            src="data:image/png;base64,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"
          />
          여행 플래너
        </div>
        <div style={{ width: '50%', float: 'right', textAlign: 'right' }}>
          <Button type="primary" onClick={() => setVisible(true)}>
            로그인
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <LoginModal visible={visible} setVisible={setVisible} />
        <GoogleMaps />
      </div>
      <Footer />
    </div>
  );
};

export default Maps;
