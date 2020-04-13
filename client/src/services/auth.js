class Auth {
  constructor() {
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
}

export default new Auth();
