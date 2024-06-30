import {ADDRESS} from '@utils/constants';
import axios from 'axios';

const api = axios.create({
  baseURL: ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
