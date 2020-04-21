// eslint-disable-next-line import/no-cycle
import Api from './api';

class Auth {
  constructor() {
    this.userInfo = {};
    this.userKey = 'user';
    this.tokenKey = 'Bearer ';
    this.token = '';
    this.isAuth = false;
    if (localStorage.getItem(this.tokenKey) && localStorage.getItem(this.tokenKey).length) {
      this.token = localStorage.getItem(this.tokenKey);
      this.isAuth = true;
    } else {
      this.token = '';
      this.isAuth = false;
    }
  }

  isAuthenticated() {
    return this.isAuth;
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
    this.isAuth = true;
  }

  removeToken() {
    this.token = '';
    localStorage.removeItem(this.tokenKey);
    this.isAuth = false;
  }

  getProfile() {
    if (this.isAuth) {
      Api.getCurrentUser('persons/currentUser', this.token)
        .then((response) => {
          if (response.error) {
            // eslint-disable-next-line no-console
            console.error(response);
            return;
          }
          this.userInfo = response.data;
          localStorage.setItem('user', response.data);
        });
    }
  }
}

export default new Auth();
