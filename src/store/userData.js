import { makeAutoObservable } from "mobx";

class User {
  user = {
    id: null,
    email: null,
    token: null,
    isLoggedIn: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  userInfo({ id, email, accessToken }) {
    this.user = {
      id: id,
      email: email,
      token: accessToken,
      isLoggedIn: true,
    };
  }
}

const userStore = new User();

export default userStore;
