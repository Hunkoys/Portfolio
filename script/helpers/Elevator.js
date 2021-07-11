let threshhold = 10;
function fuse() {
  if (threshhold-- < 0) {
    console.log('POP');
    return true;
  } else return false;
}

fuse.reset = () => {
  threshhold = 10;
};

class Elevator {
  constructor(scope = document) {
    this.priv = {
      scope,
      tracked: {},
      cache: {},
      bounderies: {},
      boundery: () => {
        return Object.keys(this.priv.bounderies)[0];
        // // In case code above turns out to fail
        // for (const key of Object.keys(this.priv.bounderies)) {
        //   if (this.priv.bounderies[key](scrollY) === undefined) {
        //     return key;
        //   }
        // }
      },
      crossedScreen: () => {
        let crossedScreen;

        let moreScreen = true;
        while (moreScreen) {
          if (fuse()) return;

          moreScreen = this.priv.boundery(scrollY);

          if (moreScreen) {
            crossedScreen = moreScreen;
            this.priv.boundery = this.priv.bounderies[crossedScreen];
          }
        }

        fuse.reset();

        return crossedScreen;
      },
      crossTask: () => {},
      runScroll: () => {
        const crossedScreen = this.priv.crossedScreen();

        if (crossedScreen) {
          this.priv.crossTask(crossedScreen);
        }
      },
      runCache: () => {
        for (const [name, elem] of Object.entries(this.priv.tracked)) {
          this.priv.cache[name] = documentPosition(elem);
        }

        const sequence = Object.keys(this.priv.cache).sort((keyA, keyB) => {
          return this.priv.cache[keyA].top - this.priv.cache[keyB].top;
        });

        sequence.forEach((key, i) => {
          this.priv.bounderies[key] = (y) => {
            const before = sequence[i - 1];
            const after = sequence[i + 1];
            if (y < this.priv.cache[key].top - innerHeight / 2) return before;
            else if (y > this.priv.cache[key].bottom - innerHeight / 2) return after;
          };
        });
      },
    };

    this.priv.scope.addEventListener('scroll', (e) => {
      this.priv.runScroll();
    });
  }

  track(screens) {
    this.priv.tracked = { ...this.priv.tracked, ...screens };
    this.priv.runCache();

    for (const screen of Object.values(screens)) {
      screen.onResize(() => {
        this.priv.runCache();
      });
    }
  }

  onCross(task) {
    this.priv.crossTask = task;
    this.priv.runScroll();
  }

  scroll(value) {
    // accepts px, tracked Strings, and SuperDom?

    if (this.priv.tracked[value]) {
      if ('scrollBehavior' in document.documentElement.style) {
        const y = this.priv.cache[value].top;
        scroll({ top: y, behavior: 'smooth' });
      } else {
        xscroll(this.priv.tracked[value].element);
      }
    }
  }
}

export default Elevator;
