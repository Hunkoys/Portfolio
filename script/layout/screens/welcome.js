import dom from '../../../lib/superdom.js';
import theme, { font } from '../theme.js';

// LESSON: Don't export instances unless you can modify them from the import

// Content

const greeting = dom.span('Hi.').style({
  fontSize: '204px',
  fontWeight: 'bold',
  marginLeft: '-13px',
});

const introduction = dom
  .div(dom.p(`I'm Dominic Victoria.`), dom.p(`Software Developer.`), dom.p(`Let's work together!`))
  .style({
    fontSize: font.l,
  });

const chatButton = ChatButton('EMAIL', 'icons/mail.png');

const rightGroup = dom.div(introduction, chatButton).style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '47px',
});

const content = dom.section(greeting, rightGroup).style({
  display: 'flex',
  width: '90%',
  minWidth: '1000px',
  maxWidth: '1300px',
  margin: 'auto',
  padding: '0 58px',
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
    BigText('DOMINIC VICTORIA', -170, '#6CCCDB', 0.09),
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
});

screen.chatButton = chatButton;

export default screen;

// Screen
// ----------------

function ChatButton(text, icon) {
  const textElement = dom.span(text).style({
    fontSize: font.m,
    color: theme.accentText,
  });
  const iconElement = dom.img(icon, 'chat icon');

  return dom.button(iconElement, textElement).style({
    background: theme.action,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '130px',
    height: '45px',
    // paddingLeft: '5px',
    padding: '20px',
    borderRadius: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    boxShadow: '2px 2px 9px #00000021',
  });
}

function BigText(text, offset, color = theme.text, opacity = 0.03) {
  const textHeight = fontSize * 0.75;

  const sdom = dom.span(text).style({
    position: 'absolute',
    opacity: opacity,
    left: `${offset}px`,
    top: `${line}px`,

    whiteSpace: 'nowrap',
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    color: `${color}`,
    textShadow: `${color} 0 0 10px, ${color} 0 0 20px, ${color} 0 0 40px`,
  });

  line += textHeight + gap;
  return sdom;
}
