import type { Axios } from 'axios';
import axios from 'axios';
import apiServer from '../../config/apiServer';

const { NODE_ENV } = process.env;

const caxios: Axios = axios.create();

caxios.defaults.baseURL = `${apiServer[NODE_ENV || ''].prefix}`;
caxios.defaults.timeout = 100000;
caxios.defaults.withCredentials = true;
caxios.defaults.headers.common['Content-Type'] = 'application/json';
// caxios.interceptors.request.use((error) => {
//   console.log('request');
//   console.log(error);
// });

// caxios.interceptors.response.use((error) => {
//   console.log('response');
//   console.log(error);
// });
export default caxios;
