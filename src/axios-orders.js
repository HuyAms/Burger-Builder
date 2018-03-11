import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-5a0c7.firebaseio.comf/'
});

export default instance;