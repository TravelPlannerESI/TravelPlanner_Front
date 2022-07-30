import React from 'react';
import styles from './index.less';
import { Card } from 'antd';

const DashBoard: React.FC = () => {
  return (
    <div className={styles.content} style={{ padding: 30 }}>
      <Card style={{ width: '100%', height: 150, marginBottom: 20 }}></Card>

      <Card style={{ width: '100%', height: 400, marginBottom: 20 }}></Card>

      <Card style={{ width: '100%', height: 150 }}></Card>
    </div>
  );
};

export default DashBoard;
