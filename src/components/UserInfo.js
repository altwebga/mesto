/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/
export class UserInfo {
	_profileNameNode = null;
	_profileProfessionNode = null;

  constructor(profileNameSelector, profileProfessionSelector) {
		this._profileNameNode = document.querySelector(profileNameSelector);
		this._profileProfessionNode = document.querySelector(profileProfessionSelector);
  }

  getUserInfo() {
    return {
      name: this._profileNameNode.textContent,
      info: this._profileProfessionNode.textContent,
    };
  }

  setUserInfo({name, info}) {
    this._profileNameNode.textContent = name;
    this._profileProfessionNode.textContent = info;
  }
}
