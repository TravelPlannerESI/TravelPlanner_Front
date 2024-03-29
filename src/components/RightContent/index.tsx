import { LoadingOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';
import { history, useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import Toast from '../Toast';
import { Client } from '@stomp/stompjs';
import caxios from '../../util/caxios';
import { useEffect, useState } from 'react';

export type SiderTheme = 'light' | 'dark';

let client: Client;
const GlobalHeaderRight: React.FC = () => {
  const connect = () => {
    client = new Client({
      brokerURL: 'ws://localhost:8095/travel-stomp/websocket',
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        subscribe();
      },
      onWebSocketClose: () => {
        console.log('연결종료');
        client.deactivate();
      },
    });

    client.activate();
  };
  const [content, setContent] = useState({});
  useEffect(() => {
    connect();

    caxios.get(`/travel/toast`).then((res) => {
      const data = res?.data?.data;
      const json = JSON.stringify({ size: data?.length, content: data });
      sessionStorage.setItem('temp', json);
      setContent(json);
    });
  }, []);
  useEffect(() => {
    console.log(sessionStorage.getItem('plan'));
  }, [sessionStorage.getItem('plan')]);

  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const addContent = (data: any) => {
    const item: any = JSON.parse(sessionStorage.getItem('temp'));
    sessionStorage.setItem(
      'temp',
      JSON.stringify({ size: item.size + 1, content: [data, ...item.content] }),
    );
    setContent(item);
  };

  const addPlanMember = (data: any) => {
    sessionStorage.setItem('plan', JSON.stringify({ data }));
  };

  const subscribe = () => {
    if (client != null) {
      client.subscribe(`/sub/toast/${initialState?.currentUser?.email}`, (data: any) => {
        const body = JSON.parse(data.body);
        if (body?.alarm) {
          addContent(body.data);
        } else {
          addPlanMember(body.data);
        }
      });
    }
  };

  return (
    <>
      <Toast content={content} />
      <Space className={className}>
        {initialState?.currentUser ? (
          <>
            {' '}
            <Button
              shape="circle"
              type="primary"
              icon={<SettingOutlined />}
              onClick={() => {
                history.push('/setting');
              }}
            />
            <Avatar client={client} />
          </>
        ) : (
          <LoadingOutlined />
        )}
      </Space>
    </>
  );
};
export default GlobalHeaderRight;
