import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import styles from './index.less';
import CreatedTravel from './createdTravel';
import InvitedTravel from './invitedTravel';

interface DataType {
  key: string | number;
  travelName: string;
  countryName: string;
}

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

      {/* <div className={styles.eachContentWrapper}>
        <CreatedTravel />
      </div>

      <hr />

      <div className={styles.eachContentWrapper}>{<InvitedTravel />}</div>

      <hr />
      <div style={{ height: '100px' }}>asd1</div>
      <div style={{ height: '100px' }}>asd2</div>
      <div style={{ height: '100px' }}>asd3</div>
      <div style={{ height: '100px' }}>asd4</div>
      <div style={{ height: '100px' }}>asd5</div>
      <div style={{ height: '100px' }}>asd6</div>
      <div style={{ height: '100px' }}>asd7</div>
      <div style={{ height: '100px' }}>asd8</div>
      <div style={{ height: '100px' }}>asd9</div> */}
    </div>
  );
};

export default SettingContent;
