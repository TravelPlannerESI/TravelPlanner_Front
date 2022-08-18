import styles from './index.less';
import SettingMenu from './component/settingMenu';
import SettingContent from './component/settingContent';
import { useState } from 'react';
import CreatedTravel from './component/settingContent/createdTravel';
import InvitedTravel from './component/settingContent/invitedTravel';

const Setting = () => {
  const [menu, setMenu] = useState<any>([
    {
      menuId: 'menu1',
      menuName: '내가 만든 여행',
      render: <CreatedTravel />,
    },
    {
      menuId: 'menu2',
      menuName: '내가 초대된 여행',
      render: <InvitedTravel />,
    },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div style={{ width: '20%' }}>
          <SettingMenu menu={menu} />
        </div>
        <div style={{ width: '80%' }}>
          <SettingContent menu={menu} />
        </div>
      </div>
    </div>
  );
};

export default Setting;
