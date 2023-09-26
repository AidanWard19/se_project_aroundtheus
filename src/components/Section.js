export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderer = renderer;
    this._items = items;
    this._selector = selector;
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItem(element) {
    this._selector.append(element);
  }
}
