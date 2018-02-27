import * as axios from 'axios';
import { loginUrl } from '../config';
import { clientId, clientSecret } from '../env';

const login = ({ username, password }) => {
  const postData = {
    grant_type: 'password',
    client_id: clientId,
    client_secret: clientSecret,
    username,
    password,
    scope: '',
  };
  return axios.post(loginUrl, postData);
};

export default {
  login,
};
