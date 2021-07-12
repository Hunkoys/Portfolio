import dom from '../../../lib/superdom.js';
import theme, { font } from '../theme.js';
import Nav from './header/Nav.js';

const headerTiming = '400ms ease-in-out';

const title = dom
  .a('/', dom.h1('Dominic Victoria').style({ fontSize: font.m, color: '#434343' }))
  .style({ textDecoration: 'none' });

export const navOptions = {
  welcome: 'WELCOME',
  projects: 'PROJECTS',
  about: 'ABOUT',
  contact: 'CONTACT',
};

const nav = Nav(navOptions)
  .style({
    display: 'flex',
    justifyContent: 'space-between',
    width: '395px',
    borderRadius: '32px',
    background: '#33333320',
    padding: '4px',
    height: '45px',
    transition: `background ${headerTiming}`,
  })
  .optionStyle({
    fontSize: font.s,
    fontWeight: font.bold,
    padding: '1px 12px',
    color: '#858585',
    cursor: 'pointer',
    letterSpacing: '1px',
    zIndex: 1,
  })
  .selectedStyle({
    color: theme.accentText,
  });

nav.floater
  .style({
    color: 'white',
    borderRadius: '40px',
    height: '37px',
    width: '50px',
    position: 'absolute',
    zIndex: 0,
  })
  .setTransition({
    left: '500ms cubic-bezier(0, 1, 0, 1)',
    width: '500ms cubic-bezier(.24,1.02,0,1.01)',
  });

const LinkIcon = (href, name) =>
  dom.a(
    href,
    dom.img(`icons/${name}.png`, name, 24, 24).style({
      margin: '0 8px',
    })
  );

const links = dom
  .section(
    LinkIcon('https://www.linkedin.com/in/hunkoys/', 'linkedin'),
    LinkIcon('https://github.com/Hunkoys', 'github'),
    LinkIcon('https://stackoverflow.com/users/2860935/hunkoys', 'stackoverflow')
  )
  .style({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '130px',
  });

const header = dom
  .div(title, nav, links)
  .style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0 8px 124px #959da521',
    background: `${theme.background}D9`,
    webkitBackdropFilter: 'saturate(180%) blur(20px)',
    backdropFilter: 'saturate(180%) blur(20px)',
    borderRadius: '0 0 36px 36px',
    transition: `box-shadow ${headerTiming}`,
  })
  .onLoad(() => {
    setTimeout(() => {
      nav.setOffset(header.rect.left);
    }, 2000);
  })
  .id('header');

header.nav = nav;

export default header;
