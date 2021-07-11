import dom from '../../../../lib/superdom.js';
import Selector from '../../components/Selector.js';

class Floater {
  constructor() {
    this.sdom = dom.div();

    this.priv = {
      left: 0,
      offset: 0,
      transitionRules: {},

      align: () => {
        this.sdom.style({
          left: `${this.priv.left - this.priv.offset}px`,
        });
      },
      transitionOn: () => {
        this.sdom.style({ transition: this.priv.transitionRules });
      },
      transitionOff: () => {
        this.sdom.style({ transition: '' });
      },
    };
  }

  transition(offset) {
    this.priv.transitionOn();
    this.priv.left = offset;
    this.priv.align();
  }

  jumpTo(offset) {
    this.priv.transitionOff();
    this.priv.left = offset;
    this.priv.align();
  }

  setOffset(offset) {
    this.priv.transitionOff();
    this.priv.offset = offset;
    this.priv.align();
  }

  style(styleObject) {
    this.sdom.style(styleObject);
    return this;
  }

  setTransition(transitionRules) {
    const rules = Object.entries(transitionRules).map((entry) => {
      return entry.join(' ');
    });

    this.priv.transitionRules = rules.join(', ');
    return this;
  }
}

class RectsCache extends God {
  constructor() {
    super();

    this.priv.cache = {};
  }

  store(options) {
    const entries = Object.entries(options);
    for (const [value, superdom] of entries) {
      this.priv.cache[value] = superdom.rect;
    }
  }

  get(option) {
    return this.priv.cache[option];
  }
}

function Nav(options) {
  const floater = new Floater();
  const cache = new RectsCache();

  const selectQueue = [];

  const nav = new Selector(...Object.values(options))
    .append(floater.sdom)
    .onLoad(() => {
      setInterval(() => {
        cache.store(nav.options);
        while (selectQueue[0]) {
          const value = selectQueue.shift();
          nav.select(value);
        }
      }, 50);
    })
    .onResize(() => {
      cache.store(nav.options);
    });

  nav._onSelect = nav.onSelect;

  let userSelectTask;
  nav._onSelect((value) => {
    if (userSelectTask) userSelectTask(value);
  });

  nav.floater = floater;
  nav.setOffset = (offset) => {
    cache.store(nav.options);
    if (nav.selected) floater.jumpTo(cache.get(nav.selected).left);
    floater.setOffset(offset);
  };

  nav.onSelect = (task) => {
    userSelectTask = task;

    return nav;
  };

  nav.nudge = (value) => {
    const selectedRect = cache.get(value);
    if (selectedRect) {
      floater.transition(selectedRect.left);
      floater.style({
        width: `${selectedRect.width}px`,
      });
    } else {
      selectQueue.push(value);
    }
    nav.select(value);
  };

  return nav;
}

export default Nav;
