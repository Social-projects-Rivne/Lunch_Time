import axios from 'axios';

class Api {
  constructor() {
    this.apiUrl = '/data.json';
    // 'http://localhost:8080/';
  }

  getAll() {
    return axios.get(this.apiUrl)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  getOne(endpoint, id) {
    // return axios.get(`${this.getApiEndpoint(endpoint)}/${id}`);
    return axios.get(this.apiUrl)
      .then((response) => {
        return response.data[`${endpoint}`].find((restaurant) => {
          return restaurant.id === id;
        });
      });
  }

  getApiEndpoint(endpoint) {
    return this.apiUrl.endsWith('/') ? `${this.apiUrl}${endpoint}` : `${this.apiUrl}/${endpoint}`;
  }
}

export default new Api();
