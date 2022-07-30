import React from 'react';
import styles from './index.less';

const SettingMenu = ({ menu }: any) => {
  const onScrollChange = (menuId: string) => {
    let target = document.getElementById(menuId);
    console.log(target?.offsetTop);
    window.scrollTo({ left: 0, top: target?.offsetTop, behavior: 'smooth' });
  };

  return (
    <div className={styles.menuWrapper}>
      {menu?.map(({ menuId, menuName }: any) => {
        return (
          <div className={styles.menu} key={menuId} onClick={() => onScrollChange(menuId)}>
            {menuName}
          </div>
        );
      })}
    </div>
  );
};

export default SettingMenu;
