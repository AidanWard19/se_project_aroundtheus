export default class UserInfo {
  constructor(usernameSelector, aboutSelector) {
    this._name = document.querySelector(usernameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserInfo({ name, about }) {
    console.log(name);
    this._name.textContent = name;
    this._about.textContent = about;
    console.log(this._name.textContent);
  }
}
