import { useState, useEffect } from 'react';
import './style.css';
import TravelFormModal from '@/components/TravelFormModal';
import { Button, Card } from 'antd';
import caxios from '@/util/caxios';
const navLinks = [
  { url: '/about-us', name: 'About Us' },
  { url: '/projects', name: 'Projects' },
  { url: '/services', name: 'Services' },
  { url: '/contact-us', name: 'Contact Us' },
];

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
      console.log('newObj ', newObj);
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
        {initialState.map((m) => (
          <Card style={{ width: 300 }}>
            <p>{m.travelName}</p>
            <p>{m.startDate}</p>
            <p>{m.endDate}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default RightSider;
