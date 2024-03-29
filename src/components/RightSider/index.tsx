import TravelFormModal from '@/components/TravelFormModal';
import caxios from '@/util/caxios';
import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import CustomPagination from '../CustomPagination';
import styles from './index.less';
import './style.css';

const RightSider = () => {
  const [isOpen, setIsOpen] = useState({
    style: 'rightSiderMenu active',
    menuStatus: 'close',
    menuName: '닫기',
  });

  const [travelState, setTravelState] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const setDataType = (res: any) => {
    const newObj = {};
    newObj['totalCount'] = res.totalElements;
    newObj['totalPages'] = res.totalPages;
    newObj['content'] = res.content;
    return newObj;
  };

  useEffect(() => {
    caxios
      .get(`/travel?size=7&page=0`)
      .then((res) => {
        setTravelState(setDataType(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    caxios
      .get(`/travel?size=7&page=${page - 1}`)
      .then((res) => {
        setTravelState(setDataType(res.data.data));
      })
      .catch((error) => {
        console.log(error);
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
    caxios.put(`users/${value}`).then(() => {
      history.push('/dashboard');
    });
  };

  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <button className="RightSiderbutton" onClick={() => handleClick()}>
        {isOpen.menuName}
      </button>
      <div className={isOpen.style} style={{ width: '17%' }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          일정추가
        </Button>
        <TravelFormModal
          visible={visible}
          setVisible={setVisible}
          setTravelState={setTravelState}
          page={page}
          setPageData={setDataType}
        />
        <div style={{ marginTop: 35, height: '685px' }}>
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
