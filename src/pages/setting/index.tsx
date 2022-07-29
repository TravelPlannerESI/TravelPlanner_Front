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
    {
      menuId: 'menu3',
      menuName: 'asd1',
      render: <div>asd1</div>,
    },
    {
      menuId: 'menu4',
      menuName: 'asd2',
      render: <div>asd2</div>,
    },
    {
      menuId: 'menu5',
      menuName: 'asd3',
      render: <div>asd3</div>,
    },
    {
      menuId: 'menu6',
      menuName: 'asd4',
      render: <div>asd4</div>,
    },
    {
      menuId: 'menu7',
      menuName: 'asd5',
      render: <div>asd5</div>,
    },
    {
      menuId: 'menu8',
      menuName: 'asd6',
      render: <div>asd6</div>,
    },
    {
      menuId: 'menu9',
      menuName: 'asd7',
      render: <div>asd7</div>,
    },
    {
      menuId: 'menu10',
      menuName: 'asd8',
      render: <div>asd8</div>,
    },
    {
      menuId: 'menu11',
      menuName: 'asd9',
      render: <div>asd9</div>,
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
