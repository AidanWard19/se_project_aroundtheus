export default class UserInfo {
  constructor(usernameSelector, jobSelector) {
    this._username = document.querySelector(usernameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      job: this._job.textContent,
    };
    return userInfo;
  }

  setUserInfo({ username, job }) {
    console.log(username);
    this._username.textContent = username;
    this._job.textContent = job;
    console.log(this._username.textContent);
  }
}
