import styles from './index.less';

const SettingContent = ({ menu }: any) => {
  return (
    <div>
      {menu?.map(({ menuId, menuName, render }: any) => {
        return (
          <div id={menuId} className={styles.eachContentWrapper} key={menuId}>
            {render}
          </div>
        );
      })}
    </div>
  );
};

export default SettingContent;
