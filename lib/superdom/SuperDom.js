import Prop from './Prop.js';
import { SuperEvent } from './SuperEvent.js';

export default class SuperDom extends SuperEvent {
  constructor(element) {
    super(element);

    this.priv.styleHierarchy = {};
  }

  user = {};

  get raw() {
    return this.priv.element;
  }

  get children() {
    return this.priv.element.children;
  }

  get childNodes() {
    return this.priv.element.childNodes;
  }

  get innerText() {
    return this.priv.element.innerText;
  }

  get width() {
    return this.priv.element.getBoundingClientRect().width; //Make static
  }

  get rect() {
    return this.priv.element.getBoundingClientRect();
  }

  get element() {
    return this.priv.element;
  }

  id(id) {
    this.priv.element.id = id;
    return this;
  }

  style(styleObject) {
    for (const prop in styleObject) {
      const value = styleObject[prop];
      if (!this.priv.styleHierarchy[prop]) this.priv.styleHierarchy[prop] = new LinkedList();
      if (this.priv.styleHierarchy[prop].includes(value)) this.priv.styleHierarchy[prop].move(value).toLast();
      else this.priv.styleHierarchy[prop].push(value);

      this.priv.element.style[prop] = value;
    }

    return this;
  }

  clearStyle() {
    this.priv.element.attributeStyleMap.clear();

    return this;
  }

  getStyleProp(property) {
    return this.priv.element.style[property];
  }

  boom() {
    this.priv.styleHierarchy.color._unsafeTraverse((value) => {
      console.log(value);
    });

    console.log('last: ', this.priv.styleHierarchy.color.lastNode.value);
  }

  removeStyle(styleObject) {
    for (const prop in styleObject) {
      const stack = this.priv.styleHierarchy[prop];
      const value = styleObject[prop];
      if (stack) {
        stack.delete(value);
      }

      if (stack.lastNode) this.priv.element.style[prop] = stack.lastNode.value;
      else this.priv.element.style[prop] = '';
    }

    return this;
  }

  transition(properties) {
    // Expirementa l
    const styleObject = {};
    const propList = Object.entries(properties).map(([prop, [value, transition]]) => {
      styleObject[prop] = value;
      return `${prop} ${transition}`;
    });

    styleObject.transition = propList.join(', ');

    this.style(styleObject);
    return this;
  }

  snapStyle(styleObject) {
    // Expiremental
    this.style({ ...styleObject, transition: '' });
    return this;
  }

  empty() {
    while (this.priv.element.firstChild) this.priv.element.removeChild(this.priv.element.lastChild);
    // disconnect Props
    return this;
  }

  child(...children) {
    this.empty();

    this.append(...children);
    return this;
  }

  append(...children) {
    for (const child of children) {
      const isString = child instanceof String || typeof child === 'string';
      const isNumber = child instanceof Number || typeof child === 'number';

      if (child instanceof Node || isString) this.priv.element.append(child);
      else if (isNumber) this.priv.element.append(child.toString());
      else if (child instanceof SuperDom) {
        this.priv.element.append(child.priv.element);
        if (child.priv.loadTask) child.priv.loadTask();
      } else if (child instanceof Prop) {
        const node = new SuperDom(document.createElement('span'));

        child.connect((val) => {
          node.child(val);
        });

        this.append(node.priv.element);
      } else if (child == undefined) {
      } else console.error(`invalid child`, child);
    }

    return this;
  }

  remove(...children) {
    try {
      for (const child of children) {
        if (child instanceof SuperDom) this.priv.element.removeChild(child.element);
        else if (child instanceof Node) this.priv.element.removeChild(child);
      }
    } catch (error) {}

    return this;
  }
}

SuperDom.create = (tag) => {
  return new SuperDom(document.createElement(tag));
};
