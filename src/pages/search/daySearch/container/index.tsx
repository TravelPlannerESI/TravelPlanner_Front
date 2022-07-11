import React from 'react';
import LeftSection from '../components/leftSection';
import MiddleSection from '../components/middleSection';
import RightSection from '../components/rightSection';
import styles from './index.less';

const Container = () => {
  return (
    <div className={styles.searchContainer}>
      <LeftSection />
      <MiddleSection />
      <RightSection />
    </div>
  );
};

export default Container;
