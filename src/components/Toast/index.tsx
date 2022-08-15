import { Client } from '@stomp/stompjs';
import { Badge, List, Button, Avatar, Dropdown, Menu } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import caxios from '../../util/caxios';
import { history } from 'umi';

const Toast = ({ content }) => {
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

  const menu = (
    <Menu style={{ height: '300px', overflowY: 'auto' }}>
      {JSON.parse(sessionStorage.getItem('temp') || JSON.strinit - mgify('')).content?.map(
        (item, idx) => (
          <Menu.Item key={`menu${idx}`} onClick={() => history.push('/setting')}>
            <Avatar src={item?.inviteePicture} />
            {`  ${item?.invitee}님께서 ${
              item?.travelName.length > 7 ? item?.travelName.slice(0, 6) + '...' : item?.travelName
            }에 초대하셨습니다.`}
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
