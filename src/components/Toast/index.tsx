import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { Badge, List, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { size } from 'lodash';
let client: Client | null = null;

const Toast = ({ email }) => {
  const [content, setContent] = useState({ size: 0, content: [] });

  const subscribe = () => {
    if (client != null) {
      client.subscribe(`/sub/toast/${email}`, (data: any) => {
        const newMessage: string = JSON.parse(data.body).message as string;
        console.log(data);
      });
    }
  };

  useEffect(() => {
    connect();
  }, []);

  const addContent = (message: string) => {};

  const connect = () => {
    client = new Client({
      brokerURL: 'ws://localhost:8095/travel-stomp/websocket',
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        console.log(12312312312312312);
        subscribe();
      },
    });

    client.activate();
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

  return (
    <>
      <Badge style={{ marginTop: '10px', marginRight: '10px' }} count={80} size="small">
        <Button
          style={{ marginTop: '10px', marginRight: '10px' }}
          icon={<BellOutlined style={{ color: 'white', fontSize: '22px' }} />}
          type="text"
        />
      </Badge>
    </>
  );
};

export default Toast;
