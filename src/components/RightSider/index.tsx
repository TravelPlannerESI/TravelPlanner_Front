import { useState, useEffect } from 'react';
import './style.css';
import TravelFormModal from '@/components/TravelFormModal';
import { Button, Card } from 'antd';
import { DragOutlined, SettingOutlined } from '@ant-design/icons';
import caxios from '@/util/caxios';
import styles from '../../pages/search/daySearch/components/rightSection/index.less';
import { uniqueId } from 'lodash';

const RightSider = () => {
  const [isOpen, setIsOpen] = useState({
    style: 'rightSiderMenu active',
    menuStatus: 'close',
    menuName: '닫기',
  });

  const [initialState, setInitialState] = useState<any>([]);

  const setDataType = (res: any) => {
    return res.map((data: any) => {
      let newObj = {};
      Object.keys(data).forEach((key) => {
        newObj[key] = data[key];
      });
      return newObj;
    });
  };

  useEffect(() => {
    caxios.get(`/travel`).then((res) => {
      setInitialState(setDataType(res.data));
    });
  }, []);

  const handleClick = () => {
    switch (isOpen.menuStatus) {
      case 'open':
        setIsOpen({
          menuName: '닫기',
          menuStatus: 'close',
          style: 'rightSiderMenu active',
        });
        break;
      case 'close':
        setIsOpen({
          menuStatus: 'open',
          style: 'rightSiderMenu',
          menuName: '열기',
        });
        break;
    }
  };
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <button className="RightSiderbutton" onClick={() => handleClick()}>
        {isOpen.menuName}
      </button>
      <div className={isOpen.style}>
        <Button type="primary" onClick={() => setVisible(true)}>
          일정추가
        </Button>
        <TravelFormModal visible={visible} setVisible={setVisible}></TravelFormModal>
        <div style={{ marginTop: 35 }}>
          {initialState.map((m, idx) => (
            <div className={styles.planDetailContainer} key={`${uniqueId}${idx}`}>
              <div className={styles.planDetailTitle} key={`${uniqueId}${idx}`}>
                {m.travelName}
              </div>
              <div className={styles.planDetailTime}>
                <p>시작일 : {m.startDate}</p>
                <p>종료일 : {m.endDate}</p>
              </div>
              <div className={styles.planTypeNSetting}>
                <div style={{ flex: 3 }}></div>
                <div style={{ flex: 2, textAlign: 'right' }}>
                  <Button shape="circle" type="default" icon={<SettingOutlined />} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RightSider;
