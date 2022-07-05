export class Section {
  constructor({ renderer }, parentSelector) {
    this._renderer = renderer;
    this._parent = document.querySelector(parentSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(card) {
    this._parent.prepend(card);
  }
}
