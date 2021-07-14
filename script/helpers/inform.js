// Injector Alert :)

import dom, { SuperDom } from '../../lib/superdom.js';
import theme, { font } from '../layout/theme.js';

const infos = new LinkedList();

const DURATION = 1000;
const FLOAT_DURATION = 500;
const FADE_DURATION = 500;

const float = `top ${FLOAT_DURATION}ms cubic-bezier(0,.85,.04,.92)`;
const fade = `opacity ${FADE_DURATION}ms`;

function Info(text) {
  return dom.div(text).style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    opacity: 1,
    background: '#88888870',
    padding: '20px',
    borderRadius: '40px',
    fontSize: font.l,
    fontWeight: font.bold,
    color: theme.accentText,
    transition: `${float}, ${fade}`,
  });
}

function remove(info) {
  inform.box.remove(info);
}

function inform(text, duration = DURATION) {
  const info = Info(text);
  infos.push(info);

  if (infos.length > 1) {
    setTimeout(() => {
      const old = infos.shift();
      remove(old);
    }, FLOAT_DURATION / 2);
  }

  inform.box.append(info);
  setTimeout(() => {
    info.style({
      top: '-160px',
    });

    setTimeout(() => {
      info.style({
        opacity: 0,
      });

      setTimeout(() => {
        infos.delete(info);
        remove(info);
      }, FADE_DURATION);
    }, FLOAT_DURATION);
  }, 0);

  infos.traverse((value) => {
    console.log(value.innerText);
  });
}

inform.init = function () {
  const body = document.getElementsByTagName('body')[0];
  if (!body) console.error(`can't find a body tag in your document`);

  inform.box = dom.div().style({
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    height: '0px',
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
  });

  new SuperDom(body).append(inform.box);
};

export default inform;
