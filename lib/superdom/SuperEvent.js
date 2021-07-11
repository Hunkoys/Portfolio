import { mutateListener, resizeListener } from './observers.js';

export class SuperEvent extends God {
  constructor(element) {
    super();
    this.priv.element = element;
  }

  onClick(task) {
    this.priv.element.onclick = (e) => {
      task(this, e);
    };
    return this;
  }
  removeOnClick() {
    this.priv.element.onclick = '';
    return this;
  }

  onRightClick(task) {
    this.priv.element.oncontextmenu = (e) => {
      task(this, e);
    };
    return this;
  }
  removeOnRightClick() {
    this.priv.element.oncontextmenu = '';
    return this;
  }

  onMouseDown(task) {
    this.priv.element.onmousedown = (e) => task(this, e);
    return this;
  }
  removeOnMouseDown() {
    this.priv.element.onmousedown = '';
    return this;
  }

  onMouseUp(task) {
    this.priv.element.onmouseup = (e) => task(this, e);
    return this;
  }
  removeOnMouseUp() {
    this.priv.element.onmouseup = '';
    return this;
  }

  onResize(task) {
    this.removeOnResize();

    const className = resizeListener.add(this, (...args) => {
      task.call(this, ...args);
    });

    this.priv.resizeClassName = className;
    this.priv.element.classList.add(className);
    return this;
  }
  removeOnResize() {
    resizeListener.remove(this.priv.resizeClassName);
    this.priv.element.classList.remove(this.priv.resizeClassName);
    return this;
  }

  onLoad(task) {
    this.priv.paintClassName = mutateListener.add(this, task);
    this.priv.element.classList.add(this.priv.paintClassName);
    return this;
  }
  removeOnLoad() {
    mutateListener.remove(this.priv.paintClassName);
    this.priv.element.classList.remove(this.priv.paintClassName);
    return this;
  }
}
