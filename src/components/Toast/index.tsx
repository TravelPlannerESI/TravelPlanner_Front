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
      console.log(data.length, '  ', data);
      setContent({ size: data.length, content: data });
    });
  }, []);

  const subscribe = () => {
    console.log('start subscribe ', content);
    if (client != null) {
      client.subscribe(`/sub/toast/${email}`, (data: any) => {
        console.log('run subscribe : ', content);
        const body = JSON.parse(data.body);
        const prevContent = content.content;
        setContent((s) => ({ size: content.size + 1, content: [body, ...prevContent] }));
      });
    }
    console.log('end subscribe ', content);
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
    <Menu>
      {content.content.map((item, idx) => (
        <Menu.Item>
          <Avatar src={item?.inviteePicture} />
          {`  ${item?.invitee}님께서 ${item?.travelName.slice(0, 6)}에 초대하셨습니다.`}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Badge
        style={{ marginTop: '10px', marginRight: '10px' }}
        count={content.size}
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
