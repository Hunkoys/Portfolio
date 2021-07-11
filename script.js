import './lib/standard.js';
import dom, { SuperDom } from './lib/superdom.js';
import Elevator from './script/helpers/Elevator.js';
import header from './script/layout/parts/header.js';
import about from './script/layout/screens/about.js';
import contact from './script/layout/screens/contact.js';
import projects from './script/layout/screens/projects.js';
import welcome from './script/layout/screens/welcome.js';
import theme, { font } from './script/layout/theme.js';

// min desktop width 1400px

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
  zIndex: 100,
  width: `calc(100% - ${parseInt(headerMargin) * 2}px)`,
  padding: `16px ${headerPadding}px`,
  margin: `0 ${headerMargin}px`,
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

// ----------------
// ABOUT

// const info = dom
//   .div()
//   .style({
//     display: 'flex',
//     justifyContent: 'center',
//     position: 'fixed',
//     top: '100vh',
//     width: '100vw',
//     pointerEvents: 'none',
//     opacity: 1,
//     transition: 'top 1000ms cubic-bezier(0.2, 1, 0.2, 1), opacity 1000ms',
//   })
//   .child(
//     dom.div().style({
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       background: '#88888870',
//       color: 'white',
//       height: '80px',
//       width: '200px',
//       borderRadius: '40px',
//       fontSize: font.l,
//     })
//   );

// let fade;
// window.inform = (text) => {
//   clearTimeout(fade);
//   main.remove(info);
//   info.style({
//     top: '100vh',
//     opacity: 1,
//   });
//   main.append(info);
//   info.element.firstElementChild.innerText = text;

//   info.style({});

//   setTimeout(() => {
//     info.style({
//       top: '85vh',
//     });
//   }, 0);

//   fade = setTimeout(() => {
//     info.style({
//       opacity: 0,
//     });

//     setTimeout(() => {
//       main.remove(info);
//       info.style({
//         top: '90vh',
//         opacity: 1,
//       });
//       main.append(info);
//     }, 500);
//   }, 500);
// };
// ----------------

main.child(header, welcome, projects, about, contact);

setTimeout(() => {
  inform('Copied');
}, 500);
setTimeout(() => {
  inform('Amo');
}, 1500);

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
