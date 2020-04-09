import axios from 'axios';
import { config as configDev } from '../environments/environment.dev';
import { config as configProd } from '../environments/environment.prod';

class Api {
  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.apiUrl = configDev.apiUrl;
    } else {
      this.apiUrl = configProd.apiUrl;
    }
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
    return this.apiUrl.endsWith('/') ? `${this.apiUrl}${endpoint}` : `${this.apiUrl}/${endpoint}`;
  }
}

export default new Api();
