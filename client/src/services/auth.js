class Auth {
  constructor() {
    this.tokenKey = 'Bearer ';
    this.personId = 'personId';
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

  savePersonId(id) {
    localStorage.setItem(this.personId, id);
  }

  getPersonId() {
    return +localStorage.getItem(this.personId);
  }

  cleanLocalStorage() {
    this.token = '';
    localStorage.clear();
    this.isAuth = false;
  }
}

export default new Auth();
