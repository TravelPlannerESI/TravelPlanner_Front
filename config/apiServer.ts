/**
 * 배포시 연결할 백엔드 서버의 주소를 설정합니다.
 */
export default {
  production: {
    url: 'http://localhost:8095',
    prefix: '/api/v1',
  },
  development: {
    url: 'http://localhost:8095',
    prefix: '/api/v1',
  },
};
