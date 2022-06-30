import { Modal } from 'antd';
import googleLogo from './asset/google_login.png';
import kakaoLogo from './asset/kakao_login_medium_narrow.png';
import naverLogo from './asset/naver_login.png';

const oauthLink = 'http://localhost:8095/oauth2/authorization/';
const [google, kakao, naver] = ['google', 'kakao', 'naver'];

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
            <a href={`${oauthLink}${google}`}>
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
            <a href={`${oauthLink}${kakao}`}>
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
            <a href={`${oauthLink}${naver}`}>
              <img src={naverLogo} width={200} height={50} />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
