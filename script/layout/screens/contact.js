import dom from '../../../lib/superdom.js';
import animatedCopy from '../../helpers/animated-copy.js';
import Button from '../components/contact/Button.js';
import theme, { font } from '../theme.js';

function Email() {
  return dom.p('dominicvictoriadev@gmail.com').style({
    color: theme.accent,
    fontSize: font.m,
    fontWeight: font.bold,
    letterSpacing: '1px',
    marginBottom: '50px',
  });
}

const email = Email();

const openApp = Button('OPEN MAIL APP', 'icons/open-out.png', 'mailto:dominicvictoriadev@gmail.com');
const copy = Button('COPY', 'icons/copy.png').onClick(() => {
  // const email = Email().style({
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  // });
  // emailBox.append(email);
  animatedCopy(email);
});

const emailBox = dom.div(email).style({
  position: 'relative',
});

const buttonGroup = dom.div(openApp, copy).style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '220px',
});

const screen = dom.section(emailBox, buttonGroup).style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  minHeight: '900px',
  maxHeight: '1200px',
  background: 'linear-gradient(111.19deg, #313637 17.69%, #262A2B 81.29%)',
});

export default screen;
