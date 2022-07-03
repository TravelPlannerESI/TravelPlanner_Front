import { extend } from 'umi-request';

import apiServer from '../../config/apiServer';

const { NODE_ENV } = process.env;

const request = extend({
  getResponse: true,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // 기본 요청이 쿠키를 전달하는지 여부
  prefix: `${apiServer[NODE_ENV || ''].prefix}`, // 전체 request 에 대한 url prefix 를 추가합니다.
});

export default request;
