import { useState, useEffect } from 'react';
import './style.css';
import TravelFormModal from '@/components/TravelFormModal';
import { Button, Card } from 'antd';
import { history, useModel } from 'umi';
import styles from './index.less';
import { DragOutlined, SettingOutlined } from '@ant-design/icons';
import caxios from '@/util/caxios';

const RightSider = () => {
  const [isOpen, setIsOpen] = useState({
    style: 'rightSiderMenu active',
    menuStatus: 'close',
    menuName: '닫기',
  });

  const { initialState, setInitialState } = useModel('@@initialState');

  const [travelState, setTravelState] = useState<any>([]);

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
      setTravelState(setDataType(res.data));
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

  const travelDetailClick = (value: number) => {
    console.log('value ', value);
    setInitialState((s) => ({ ...s, currentTravel: value }));
    console.log('currentTravel', initialState?.currentTravel);
    history.push('/search/day');
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
          {travelState.map((m, idx) => (
            <div className={styles.planDetailContainer} key={idx}>
              <div className={styles.planDetailTitle}>{m.travelName}</div>
              <div className={styles.planDetailTime}>
                <p>시작일 : {m.startDate}</p>
                <p>종료일 : {m.endDate}</p>
              </div>
              <div className={styles.planTypeNSetting}>
                <div style={{ flex: 3 }}></div>
                <div style={{ flex: 2, textAlign: 'right' }}>
                  <Button
                    shape="circle"
                    type="default"
                    icon={<SettingOutlined />}
                    onClick={() => travelDetailClick(m.travelId)}
                  />
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
