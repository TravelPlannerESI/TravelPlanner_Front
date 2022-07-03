import { Modal } from 'antd';
import googleLogo from './asset/google_login.png';
import kakaoLogo from './asset/kakao_login_medium_narrow.png';
import naverLogo from './asset/naver_login.png';

const LoginModal = ({ visible, setVisible }: any) => {
  return (
    <>
      <Modal
        visible={visible}
        title="LOGIN"
        footer={[]}
        width={400}
        onCancel={() => setVisible(false)}
      >
        <div
          style={{
            // display: 'flex',
            justifyContent: 'center',
            width: 350,
            height: 250,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              width: 350,
              height: 80,
            }}
          >
            <a href="/oauth/kakao">
              <img src={googleLogo} width={200} height={50} />
            </a>
          </div>
          <div
            style={{
              textAlign: 'center',
              width: 350,
              height: 80,
            }}
          >
            <a href="/oauth/kakao">
              <img src={kakaoLogo} width={200} height={50} />
            </a>
          </div>
          <div
            style={{
              textAlign: 'center',
              width: 350,
              height: 80,
            }}
          >
            <a href="/oauth/kakao">
              <img src={naverLogo} width={200} height={50} />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
