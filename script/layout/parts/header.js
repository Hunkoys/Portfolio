import dom from '../../../lib/superdom.js';
import theme, { font } from '../theme.js';
import Nav from './header/Nav.js';

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
    justifyContent: 'space-around',
    width: '525px',
    borderRadius: '32px',
    background: '#ececec',
    padding: '6px',
    height: '65px',
  })
  .optionStyle({
    fontSize: font.s,
    fontWeight: font.bold,
    padding: '15px',
    color: '#858585',
    cursor: 'pointer',
    letterSpacing: '1px',
    zIndex: 1,
  })
  .selectedStyle({
    color: theme.accentText,
    borderRadius: '40px',
  });

nav.floater
  .style({
    color: 'white',
    borderRadius: '40px',
    height: '54px',
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
    dom.img(`icons/${name}.png`, name).width(34).height(34).style({
      margin: '0 10px',
    })
  );

const links = dom
  .section(
    LinkIcon('https://www.linkedin.com/in/hunkoys/', 'linkedin'),
    LinkIcon('https://github.com/Hunkoys', 'github'),
    LinkIcon('https://stackoverflow.com/users/2860935/hunkoys', 'stackoverflow')
  )
  .style({ display: 'flex' });

const headerTiming = '400ms ease-in-out';

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
    borderRadius: '0 0 58px 58px',
    transition: `box-shadow ${headerTiming}`,
  })
  .onLoad((bar) => {
    setTimeout(() => {
      nav.setOffset(bar.rect.left);
    }, 2000);
  })
  .onResize((bar) => {
    console.log(bar.rect.left);
    nav.setOffset(bar.rect.left);
  })
  .id('header');

header.nav = nav;

export default header;
