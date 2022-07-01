import type { Axios } from 'axios';
import axios from 'axios';
import apiServer from '../../config/apiServer';

const { NODE_ENV } = process.env;

const caxios: Axios = axios.create();

caxios.defaults.baseURL = `${apiServer[NODE_ENV || ''].prefix}`;
caxios.defaults.timeout = 100000;
caxios.defaults.withCredentials = true;
caxios.defaults.headers.common['Content-Type'] = 'application/json';

export default caxios;
