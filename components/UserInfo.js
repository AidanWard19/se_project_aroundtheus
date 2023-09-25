export default class UserInfo {
  constructor(username, job) {
    this._username = username;
    this._job = job;
  }

  getUserInfo() {
    const userInfo = {
      username: this._username,
      job: this._job,
    };
    return userInfo;
  }

  setUserInfo(username, job) {
    this._username.textContent = username;
    this._job.textContent = job;
  }
}
