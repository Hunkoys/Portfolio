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

let screenH = window.innerHeight; // LESSON: Exactly what we need the Prop Class for. Still don't know what to call that pattern. I guess reactive object
window.addEventListener('resize', () => {
  screenH = window.innerHeight;
  welcome.style({ height: `${screenH}px` });
});

const main = new SuperDom(document.getElementById('main'));
const screens = {
  WELCOME: welcome,
  PROJECTS: projects,
  ABOUT: about,
  CONTACT: contact,
};

// Header

window.headerPadding = 48;

header.style({
  width: '90%',
  minWidth: '1000px',
  maxWidth: '1300px',
  padding: `8px ${headerPadding}px`,
  margin: 'auto',
});

function headerShadowControl() {
  const noShadow = {
    boxShadow: '',
    background: 'none',
    webkitBackdropFilter: 'none',
    backdropFilter: 'none',
  };
  const noBar = {
    background: 'none',
  };

  if (scrollY < 200) {
    header.nav.style(noBar);
    header.style(noShadow);
  } else {
    header.nav.removeStyle(noBar);
    header.removeStyle(noShadow);
  }
}

document.addEventListener('scroll', headerShadowControl);
window.onload = () => {
  header.nav.setOffset(header.rect.left);
  headerShadowControl();
};

// ----------------
// WELCOME

welcome.style({
  width: '98vw',
  height: `${screenH}px`,
  minHeight: '700px',
  maxHeight: '1200px',
  transition: 'height 600ms',
});

main.child(
  dom
    .div(header)
    .style({
      zIndex: 100,
      width: '100%',
      position: 'fixed',
    })
    .onResize(() => {
      header.nav.setOffset(header.rect.left);
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
    header.nav.setOffset(header.rect.left); // LESSON: Just recalc this from nav's on move
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
