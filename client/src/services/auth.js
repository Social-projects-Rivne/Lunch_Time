class Auth {
  constructor() {
    this.tokenKey = 'token';
    this.token = '';
    this.isAuthenticated = false;
    if (localStorage.getItem(this.tokenKey) && localStorage.getItem(this.tokenKey).length) {
      this.token = localStorage.getItem(this.tokenKey);
      this.isAuthenticated = true;
    } else {
      this.token = '';
      this.isAuthenticated = false;
    }
  }

  isAuthenticated() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticated = true;
  }

  removeToken() {
    this.token = '';
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated = false;
  }
}

export default new Auth();
