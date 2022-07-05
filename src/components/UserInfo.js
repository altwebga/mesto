export class UserInfo {
  constructor(data) {
    this.name = document.querySelector(data.name);
    this.description = document.querySelector(data.description);
    this.avatar = document.querySelector(data.avatar);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      description: this.description.textContent,
    };
  }

  setUserInfo({name, descr, avatar}) {
    if (name) {
      this.name.textContent = name;
    }
    if (descr) {
      this.description.textContent = descr;
    }
    if (avatar) {
      this.avatar.src = avatar;
    }
  }
}
