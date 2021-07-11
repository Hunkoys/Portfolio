import SuperDom from '../SuperDom.js';

export default class Image extends SuperDom {
  constructor(src, alt, width, height) {
    super(document.createElement('img'));

    this.priv.element.src = src;
    if (alt) this.priv.element.alt = alt;
    if (width !== undefined) this.width(width);
    if (height !== undefined) this.height(height);
  }

  width(value) {
    this.priv.element.width = value;
    this.style({ width: `${value}px` });
    return this;
  }

  height(value) {
    this.priv.element.height = value;
    this.style({ height: `${value}px` });
    return this;
  }
}
