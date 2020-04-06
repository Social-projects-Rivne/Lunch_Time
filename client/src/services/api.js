import axios from 'axios';
// eslint-disabled-next
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('Bearer ');

  if (token != null) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (err) => {
  return Promise.reject(err);
});


class Api {
  constructor() {
    this.apiUrl = 'http://localhost:8080/api/';
    this.flag = false;
    this.state = {
      error: '',
    };
  }


  // eslint-disable-next-line no-unused-vars
  getLogedin(_email, _password) {
    axios.post('/api/authenticate', {
      email: _email,
      password: _password,

    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem('Bearer ', response.data);
      }
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
    return this.apiUrl.endsWith('/') ? `${this.apiUrl}${endpoint}` : `${this.apiUrl}/${endpoint}`;
  }
}
export default new Api();
