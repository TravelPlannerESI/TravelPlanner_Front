import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { Badge, List, Button, Avatar, Dropdown, Menu } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import caxios from '../../util/caxios';

let client: Client | null = null;

const Toast = ({ email }) => {
  const [content, setContent] = useState({ size: 0, content: [] });

  const connect = () => {
    client = new Client({
      brokerURL: 'ws://localhost:8095/travel-stomp/websocket',
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        subscribe();
      },
    });

    client.activate();
  };
  useEffect(() => {
    connect();
    caxios.get(`/travel/toast`).then((res) => {
      const data = res.data.data;
      const json = JSON.stringify({ size: data.length, content: data });
      sessionStorage.setItem('temp', json);
    });
  }, []);

  const addContent = (data: any) => {
    const item: any = JSON.parse(sessionStorage.getItem('temp'));

    sessionStorage.setItem(
      'temp',
      JSON.stringify({ size: item.size + 1, content: [data, ...item.content] }),
    );

    // const addData = JSON.parse(sessionStorage.getItem('temp'));
    // sessionStorage.setItem('temp', { size: item?.size + 1, content: [data, ...item.content] });

    setContent({ size: item.size, content: item.content });
  };

  const subscribe = () => {
    if (client != null) {
      client.subscribe(`/sub/toast/${email}`, (data: any) => {
        const body = JSON.parse(data.body);
        // console.log('contentSize run Subscribe = ', content.size);
        addContent(body);
      });
    }
  };
  // const handler = (message: string) => {
  //   if (client != null) {
  //     if (!client.connected) return;

  //     client.publish({
  //       destination: '/to/liar/start/1',
  //       body: JSON.stringify({
  //         message: message,
  //       }),
  //     });
  //   }
  // };

  const disConnect = () => {
    if (client != null) {
      if (client.connected) client.deactivate();
    }
  };

  const menu = (
    <Menu style={{ height: '300px', overflowY: 'auto' }}>
      {JSON.parse(sessionStorage.getItem('temp') || JSON.stringify('')).content?.map(
        (item, idx) => (
          <Menu.Item key={`menu${idx}`}>
            <Avatar src={item?.inviteePicture} />
            {`  ${item?.invitee}님께서 ${item?.travelName.slice(0, 6)}에 초대하셨습니다.`}
          </Menu.Item>
        ),
      )}
    </Menu>
  );

  return (
    <>
      <Badge
        style={{ marginTop: '10px', marginRight: '10px' }}
        count={JSON.parse(sessionStorage.getItem('temp'))?.size}
        size="small"
        showZero
      >
        <Dropdown overlay={menu} trigger={['click']} placement="bottom">
          <Button
            style={{ marginTop: '10px', marginRight: '10px' }}
            icon={<BellOutlined style={{ color: 'white', fontSize: '22px' }} />}
            type="text"
          />
        </Dropdown>
      </Badge>
    </>
  );
};

export default Toast;
