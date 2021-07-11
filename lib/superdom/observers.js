import { clx } from './clx.js';

class TaskMap extends God {
  constructor(mapName = 'task ') {
    super();
    this.priv.mapName = mapName;
    this.priv.map = {};
    this.priv.newId = (() => {
      let id = 0;
      return () => id++;
    })();
  }

  add(task, superdom) {
    const taskName = this.priv.mapName + this.priv.newId();
    this.priv.map[taskName] = { task: task.bind(superdom), superdom };
    return taskName;
  }

  remove(taskName) {
    delete this.priv.map[taskName];
  }

  elementOf(taskName) {
    const entry = this.getEntry(taskName);
    if (entry) return entry.superdom.priv.element;
  }

  runTask(taskName, ...args) {
    const entry = this.getEntry(taskName);
    if (entry) {
      const { task, superdom } = entry;
      if (task) task(superdom, ...args);
    }
  }

  getEntry(taskName) {
    return this.priv.map[taskName];
  }
}

// Resize

const RESIZE_PREFIX = 'resize-element-';
const resizeMap = new TaskMap(RESIZE_PREFIX);

const DEBOUNCE_TIME = 10;

const resizeObserver = new ResizeObserver(
  debounce((entries) => {
    for (const entry of entries) {
      const className = clx(entry.target.classList).find(RESIZE_PREFIX);
      resizeMap.runTask(className, entry);
    }
  }, DEBOUNCE_TIME)
);

export const resizeListener = {
  add(superdom, task) {
    const className = resizeMap.add(task.bind(superdom), superdom);
    resizeObserver.observe(resizeMap.elementOf(className));
    return className;
  },

  remove(className) {
    if (resizeMap[className]) resizeObserver.unobserve(resizeMap[className].superdom.priv.element);
    resizeMap.remove(className);
  },
};

// Mutation

const MUTATE_PREFIX = 'mutate-element-';
const mutateMap = new TaskMap(MUTATE_PREFIX);

function runMutateTask(node) {
  const className = clx(node.classList).find(MUTATE_PREFIX);
  mutateMap.runTask(className);

  if (node.children)
    for (const child of node.children) {
      runMutateTask(child);
    }
}

function startObservingMutations() {
  const body = document.getElementsByTagName('body')[0];
  if (body) {
    const fn = (mutationRecords) => {
      for (const record of mutationRecords) {
        if (record.type === 'childList') {
          const addedNodes = record.addedNodes.values();
          for (const node of addedNodes) {
            runMutateTask(node);
          }
        }
      }
    };

    new MutationObserver(fn).observe(body, { childList: true, subtree: true });
  } else console.error('Mutate Observer: no body element found');
}

startObservingMutations();

export const mutateListener = {
  add(superdom, task) {
    const className = mutateMap.add(task.bind(superdom), superdom);
    return className;
  },

  remove(className) {
    mutateMap.remove(className);
  },
};
