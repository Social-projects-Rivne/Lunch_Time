import axios from 'axios';
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
    this.apiUrl = 'http://localhost:8080/api/';
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
        return { error: null, data: response.data };
      })
      .catch((error) => {
        return { error: error };
      });
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
