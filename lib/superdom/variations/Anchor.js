import SuperDom from '../SuperDom.js';

export default class Anchor extends SuperDom {
  constructor(href, ...children) {
    super(document.createElement('a'));

    this.child(...children);
    this.priv.element.href = href;
  }

  target(value) {
    this.priv.element.target = value;
    return this;
  }
}
