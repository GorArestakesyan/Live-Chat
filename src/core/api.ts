import axios from 'axios';
import {ADDRESS} from '../utils/constants';

const api = axios.create({
  baseURL: ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
