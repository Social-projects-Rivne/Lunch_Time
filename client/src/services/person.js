// eslint-disable-next-line import/no-cycle
import Api from './api';
import Auth from './auth';

class Person {
  constructor() {
    this.userInfo = {};
  }

  getProfile() {
    if (Auth.isAuthenticated()) {
      Api.getCurrentUser('persons/currentUser', Auth.getToken())
        .then((response) => {
          if (response.error) {
            // eslint-disable-next-line no-console
            console.error(response);
            return;
          }
          this.userInfo = response.data;
        });
    }
  }
}

export default new Person();
