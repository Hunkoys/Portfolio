import dom from '../../../lib/superdom.js';
import theme, { font } from '../theme.js';

// Content

const greeting = dom.span('Hi.').style({
  fontSize: '288px',
  fontWeight: 'bold',
});

const introduction = dom
  .div(dom.p(`I'm Dominic Victoria.`), dom.p(`Software Developer.`), dom.p(`Let's work together!`))
  .style({
    fontSize: font.l,
  });

const chatButton = ChatButton('CHAT', 'icons/send.png');

const rightGroup = dom.div(introduction, chatButton).style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '65px',
});

const content = dom.section(greeting, rightGroup).style({
  display: 'flex',
});

// Content
// ----------------
// Background

const gap = 80;
const fontSize = 288;
let line = 0;

const background = dom
  .div(
    BigText('INNOVATE * CHANGE', -190),
    BigText('DOMINIC VICTORIA', -170).style({ color: '#6CCCDB', opacity: 0.07 }),
    BigText('SOFTWARE DEVELOPER', -1050),
    BigText('THAT IS ACTUALLY THE DREAM ~ KOBE', -2000)
  )
  .style({
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '-100px',
    left: 0,
    zIndex: -1,
  });

// Background
// ----------------
// Screen

const screen = dom.article(content, background).style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100vh',
  minHeight: '900px',
  maxHeight: '1200px',
});

export default screen;

// Screen
// ----------------

function ChatButton(text, icon) {
  const textElement = dom.span(text).style({
    fontSize: font.m,
    color: theme.accentText,
  });
  const iconElement = dom.img(icon, 'chat icon');

  return dom.button(textElement, iconElement).style({
    background: theme.action,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '164px',
    height: '55px',
    borderRadius: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    boxShadow: '2px 2px 9px #00000021',
  });
}

function BigText(text, offset) {
  const textHeight = fontSize * 0.75;

  const sdom = dom.span(text).style({
    position: 'absolute',
    opacity: 0.01,
    left: `${offset}px`,
    top: `${line}px`,

    whiteSpace: 'nowrap',
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    color: 'black',
  });

  line += textHeight + gap;
  return sdom;
}
