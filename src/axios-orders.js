import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-5a0c7.firebaseio.com'
});

export default instance;