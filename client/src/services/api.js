import axios from 'axios';
import { config as configDev } from '../environments/environment.dev';
import { config as configProd } from '../environments/environment.prod';
import Auth from './auth';

axios.interceptors.request.use((config) => {
  const resultConfig = config;
  let token;
  if (Auth.isAuthenticated()) {
    token = Auth.getToken();
    resultConfig.headers.Authorization = `Bearer ${token}`;
    return resultConfig;
  }
  return resultConfig;
}, (err) => {
  return Promise.reject(err);
});


class Api {
  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.apiUrl = configDev.apiUrl;
    } else {
      this.apiUrl = configProd.apiUrl;
    }
  }

  post(endpoint, data) {
    return axios.post(this.getApiEndpoint(endpoint), data)
      .then((response) => {
        return { error: null, data: response.data, status: response.status };
      })
      .catch((error) => {
        return { error: error.response };
      });
  }

  getAll(endpoint) {
    return axios.get(this.getApiEndpoint(endpoint))
      .then((response) => {
        return { error: null, data: response.data };
      })
      .catch((error) => {
        return { error: error };
      });
  }

  getOne(endpoint, id) {
    return axios.get(`${this.getApiEndpoint(endpoint)}/${id}`)
      .then((response) => {
        return { error: null, data: response.data, status: response.status };
      })
      .catch((error) => {
        return { error: error };
      });
  }

  async getCurrentUser(endpoint) {
    try {
      const response = await axios.get(this.getApiEndpoint(endpoint));
      return { error: null, data: response.data, status: response.status };
    } catch (error) {
      return { error: error };
    }
  }

  async getAllRestaurantFeedback(endpoint, id) {
    let response; let data;

    try {
      response = await axios.get(`${this.apiUrl}${endpoint}${id}`);
      data = await response.data;
    } catch (error) {
      return null;
    }
    return data;
  }

  put(endpoint, body) {
    const url = this.getApiEndpoint(endpoint);
    return axios({
      method: 'PUT',
      url,
      data: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .catch((error) => {
        return { error: error };
      });
  }

  getApiEndpoint(endpoint) {
    if (this.apiUrl.endsWith('/') && endpoint.startsWith('/')) {
      return `${this.apiUrl.slice(0, -1)}${endpoint}`;
    }
    if (!this.apiUrl.endsWith('/') && !endpoint.startsWith('/')) {
      return `${this.apiUrl}/${endpoint}`;
    }
    return `${this.apiUrl}${endpoint}`;
  }
}

export default new Api();
