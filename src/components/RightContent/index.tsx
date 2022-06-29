import { Button, Space } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import LoginModal from './LoginModal';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = ({ currentUser }: any) => {
  const { initialState } = useModel('@@initialState');
  const [visible, setVisible] = useState<any>(false);

  const loginPath = '/user/login';
  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const NoLoginComponent = () => {
    return (
      <>
        <LoginModal visible={visible} setVisible={setVisible} />
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          LOGIN
        </Button>
      </>
    );
  };

  return <Space className={className}>{currentUser ? <Avatar /> : <NoLoginComponent />}</Space>;
};
export default GlobalHeaderRight;
