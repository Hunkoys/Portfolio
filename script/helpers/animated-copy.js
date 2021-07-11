import dom, { SuperDom } from '../../lib/superdom.js';

class Force {
  constructor(velocity, acceleration) {
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  apply(coords) {
    const distance = this.preview();
    if (isFunction(this.acceleration)) this.velocity = this.acceleration(this.velocity);
    else this.velocity += this.acceleration;
    coords.x += distance.h;
    coords.y += distance.v;
    if (this.applyTask) this.applyTask(distance);
  }

  preview() {
    const [h, v] = this.getVector();
    const hypotenuse = Math.hypot(h, v);
    const p = this.velocity / hypotenuse;
    return p >= 1 ? { h, v } : { h: h * p, v: v * p };
  }

  vector(value) {
    if (isFunction(value)) this.getVector = value;
    else this.getVector = () => value;

    return this;
  }

  onApply(task) {
    this.applyTask = task;
  }
}

let threshold = 500;
function fuse() {
  if (threshold > 0) return threshold--;
}
fuse.reset = () => (threshold = 500);

function animate(superdom) {
  const parent = new SuperDom(superdom.element.parentElement);
  const clone = new SuperDom(superdom.element.cloneNode(true));
  const box = dom.div(clone).style({
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  });
  clone.style({
    transition: 'opacity 540ms, letter-spacing 340ms',
    opacity: 1,
    // willChange: 'transform',
  });

  parent.append(box);

  const origin = documentPosition(clone);
  const offset = (origin.right - origin.left) / 2;
  const destination = { x: 0, y: 0 };
  let scaleUnit = 1;

  const pop = new Force(5, -0.3).vector(() => [0, -300]);
  const follow = new Force(1, (vel) => vel * 1.3).vector(() => {
    if (scaleUnit > 0) scaleUnit -= 0.02;
    const x = mouseX - (origin.x + destination.x) - offset;
    const y = mouseY - (origin.y + destination.y);
    if (Math.abs(x) < 1 || Math.abs(y) < 1) forces.shift();
    return [x, y];
  });

  const forces = [pop];

  let pushed = false;
  function pushFollow() {
    if (!pushed) {
      forces.push(follow);
      clone.style({
        opacity: 0,
        letterSpacing: '-12px',
      });
    }
    pushed = true;
  }

  pop.onApply(({ v }) => {
    if (v > -1) pushFollow();
    if (v >= 0) forces.shift();
  });

  function frame() {
    for (const force of forces) {
      force.apply(destination);
    }

    const translate = `translate(${destination.x}px, ${destination.y}px)`;
    const scale = `scale(${scaleUnit})`;
    box.style({
      transform: translate + scale,
    });

    // if (!fuse()) return;

    if (forces.length) {
      requestAnimationFrame(frame);
    } else {
      parent.remove(box);
    }
  }

  requestAnimationFrame(frame);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      // inform('Copied');
    },
    function () {
      /* clipboard write failed */
    }
  );
}

function animatedCopy(superdom) {
  animate(superdom);
  copyToClipboard(superdom.element.innerText);
}

export default animatedCopy;
