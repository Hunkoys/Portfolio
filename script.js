import './lib/standard.js';
import dom, { SuperDom } from './lib/superdom.js';
import Elevator from './script/helpers/Elevator.js';
import header from './script/layout/parts/header.js';
import about from './script/layout/screens/about.js';
import contact from './script/layout/screens/contact.js';
import projects from './script/layout/screens/projects.js';
import welcome from './script/layout/screens/welcome.js';
import theme, { font } from './script/layout/theme.js';

import inform from './script/helpers/inform.js';

inform.init();
window.inform = inform;

const main = new SuperDom(document.getElementById('main'));
const screens = {
  WELCOME: welcome,
  PROJECTS: projects,
  ABOUT: about,
  CONTACT: contact,
};

const margin = 160;

// Header

const headerMargin = margin / 2;
const headerPadding = headerMargin;

header.style({
  width: `calc(100% - ${parseInt(headerMargin) * 2}px)`,
  padding: `16px ${headerPadding}px`,
  // margin: `0 ${headerMargin}px`,
  margin: 'auto',
});

document.addEventListener('scroll', () => {
  const noShadow = {
    boxShadow: '',
    background: 'none',
    backdropFilter: 'none',
  };

  if (scrollY < 200) header.style(noShadow);
  else header.removeStyle(noShadow);
});

// ----------------
// WELCOME

welcome.style({
  padding: `0 ${margin}px`,
});

main.child(
  dom.div(header).style({
    zIndex: 100,
    width: '100%',
    position: 'fixed',
  }),
  welcome,
  projects,
  about,
  contact
);

setTimeout(() => {
  const ellie = new Elevator();

  ellie.track(screens);
  ellie.onCross((screen) => {
    header.nav.nudge(screen);
  });

  header.nav.onSelect((value) => {
    ellie.scroll(value);
  });

  setTimeout(() => {
    header.nav.floater.style({
      background: theme.accent,
    });
  }, 200);
}, 100);

window.mouseY;
window.mouseX;

main.element.addEventListener('mousemove', (e) => {
  window.mouseY = e.clientY + scrollY;
  window.mouseX = e.clientX + scrollX;
});
