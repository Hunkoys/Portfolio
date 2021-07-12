// This file is a injector
import './standard/checker.js';

window.God = class {
  priv = {};
};

window.random = function (range) {
  return Math.floor(Math.random() * range);
};

window.debounce = function (func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

window.UniqueMap = class {
  constructor() {
    this.val = {};
  }

  __getUniqueId() {
    let tryAnother = false;
    let id;

    do {
      id = random(1000000);

      for (const key in this.val) {
        const existingId = Number(key);

        if (id === existingId) {
          tryAnother = true;
          break;
        }
      }
    } while (tryAnother);

    return id;
  }

  add(value) {
    const id = this.__getUniqueId();

    this.val[id] = value;

    return id;
  }

  has(id) {
    return this.val.hasOwnProperty(id);
  }

  change(id, value) {
    if (!this.has(id)) {
      console.error('id does not exist');
      return;
    }

    this.val[id] = value;
  }

  delete(id) {
    if (!this.has(id)) {
      console.error('id does not exist');
      return;
    }

    delete this.val[id];
  }

  toArray() {
    return Object.values(this.val);
  }
};

window.LinkedList = class {
  static Node = class {
    constructor(value) {
      this.value = value;
    }
    value;
    next;
  };

  _node(value) {
    return new LinkedList.Node(value);
  }

  _length = 0;
  get length() {
    return this._length;
  }

  push(value) {
    if (!this.lastNode) this.firstNode = this.lastNode = this._node(value);
    else {
      this.lastNode = this.lastNode.next = this._node(value);
    }

    this._length++;
  }

  delete(value) {
    let prevNode;
    this._unsafeTraverse((iter) => {
      if (iter.value === value) {
        if (!prevNode) this.firstNode = iter.next;
        else prevNode.next = iter.next;

        if (!iter.next) this.lastNode = prevNode;

        if (this.length > 0) this._length--;

        return true;
      }
      prevNode = iter;
    });
  }

  pop() {
    const lastNode = this.lastNode.value;
    this.delete(lastNode);
    return lastNode;
  }

  shift() {
    const firstNode = this.firstNode.value;
    this.delete(firstNode);
    return firstNode;
  }

  toArray() {
    const array = [];
    this.traverse((value) => array.push(value));
    return array;
  }

  move(value) {
    return {
      toLast: () => {
        let prevNode;
        this._unsafeTraverse((iter) => {
          if (iter.value === value) {
            if (this.lastNode === iter) return true;

            if (!prevNode) this.firstNode = iter.next;
            else prevNode.next = iter.next;
            iter.next = undefined;
            this.lastNode.next = iter;
            this.lastNode = iter;
            return true;
          }
          prevNode = iter;
        });
      },
    };
  }

  _grab(value) {
    this._unsafeTraverse((iter) => {
      return iter.value === value ? iter : undefined;
    });
  }

  includes(value) {
    let has = false;
    this._unsafeTraverse((iter) => {
      if (iter.value === value) {
        has = true;
        return 'stop';
      }
    });

    return has;
  }

  traverse(callback) {
    this._unsafeTraverse((iter) => {
      callback(iter.value);
    });
  }

  _unsafeTraverse(callback) {
    let iter = this.firstNode;
    let stop = false;
    while (iter && !stop) {
      stop = callback(iter);
      iter = iter.next;
    }
  }
};

// Poison Code:
// Needs reimplementation

window.xscroll = function (to) {
  var smoothScrollFeature = 'scrollBehavior' in document.documentElement.style;
  to = to.offsetTop;
  var i = parseInt(window.pageYOffset);
  if (i != to) {
    if (!smoothScrollFeature) {
      to = parseInt(to);
      if (i < to) {
        var int = setInterval(function () {
          if (i > to - 20) i += 1;
          else if (i > to - 40) i += 3;
          else if (i > to - 80) i += 8;
          else if (i > to - 160) i += 18;
          else if (i > to - 200) i += 24;
          else if (i > to - 300) i += 40;
          else i += 60;
          window.scroll(0, i);
          if (i >= to) clearInterval(int);
        }, 15);
      } else {
        var int = setInterval(function () {
          if (i < to + 20) i -= 1;
          else if (i < to + 40) i -= 3;
          else if (i < to + 80) i -= 8;
          else if (i < to + 160) i -= 18;
          else if (i < to + 200) i -= 24;
          else if (i < to + 300) i -= 40;
          else i -= 60;
          window.scroll(0, i);
          if (i <= to) clearInterval(int);
        }, 15);
      }
    } else {
      window.scroll({
        top: to,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
};
// Usage:
// script.js

window.documentPosition = (sd) => {
  var rect = sd.rect,
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const top = rect.top + scrollTop;
  const left = rect.left + scrollLeft;
  return {
    top,
    left,
    bottom: rect.bottom + scrollTop,
    right: rect.right + scrollLeft,
    x: left,
    y: top,
  };
};
// Usage:
// script.js
