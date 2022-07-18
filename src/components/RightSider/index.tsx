import { useState, useEffect } from 'react';
import './style.css';
import TravelFormModal from '@/components/TravelFormModal';
import { Button, Card } from 'antd';
import { history, useModel } from 'umi';
import styles from './index.less';
import { DragOutlined, SettingOutlined } from '@ant-design/icons';
import caxios from '@/util/caxios';
import CustomPagination from '../CustomPagination';
const RightSider = () => {
  const [isOpen, setIsOpen] = useState({
    style: 'rightSiderMenu active',
    menuStatus: 'close',
    menuName: '닫기',
  });

  const { initialState, setInitialState } = useModel('@@initialState');

  const [travelState, setTravelState] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const setDataType = (res: any) => {
<<<<<<< HEAD
    console.log('res', res);
    return res.map((data: any) => {
      let newObj = {};
      Object.keys(data).forEach((key) => {
        newObj[key] = data[key];
      });
      return newObj;
    });
=======
    const newObj = {};
    newObj['totalCount'] = res.totalElements;
    newObj['totalPages'] = res.totalPages;
    newObj['content'] = res.content;
    return newObj;
>>>>>>> 65738f53a85182d656799c11278cdf34b6567bdd
  };

  useEffect(() => {
    caxios.get(`/travel?size=5&page=0`).then((res) => {
      setTravelState(setDataType(res.data.data));
    });
  }, []);

  useEffect(() => {
    console.log(travelState);
    caxios.get(`/travel?size=5&page=${page - 1}`).then((res) => {
      setTravelState(setDataType(res.data.data));
    });
  }, [page]);

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
    setInitialState((s) => ({ ...s, currentTravel: value }));
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
          {travelState?.content?.map((m, idx) => (
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
        <CustomPagination
          currentPage={page}
          setPage={setPage}
          pageCount={5}
          totalPage={travelState.totalPages}
        />
      </div>
    </>
  );
};

export default RightSider;
