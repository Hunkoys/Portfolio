import dom from '../../../lib/superdom.js';
import Card from '../components/about/Card.js';
import CircleFrame from '../components/about/CircleFrame.js';
import theme from '../theme.js';

const DEFAULT = undefined;

const start = CircleFrame('pics/face.jpg', 'Profile Picture', DEFAULT, 0, -40).style({
  position: 'relative',
  left: '560px',
  marginBottom: '30px',
});
const end = CircleFrame('pics/nanadaime.gif', 'Bad Ass Person', 470, -100).style({
  position: 'relative',
  top: '-185px',
  left: '1215px',
});

const path = dom.img('pics/path.png', 'Dashed Line Path');

const masterCard = Card(
  'MASTER',
  'Before you can start to guide others, you first have to guide your self.',
  theme.accent2,
  840,
  430
);
const inspiredCard = Card(
  'INSPIRE',
  dom.span(
    `Show everyone that just because things are hard, it doesn’t mean it has to be difficult. `,
    dom.strong(`We have each other.`)
  ),
  theme.accent,
  290,
  900
);
const changeCard = Card(
  'CHANGE',
  `Together, we’ll move forward. Not for the sake of moving forward, but for making the world a better place.`,
  theme.accent3,
  760,
  1540
);

const box = dom.div(start, path, masterCard, inspiredCard, changeCard, end).style({
  display: 'inline-block',

  position: 'relative',
});

const screen = dom.section(box).style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '190px',
  paddingBottom: '200px',
  background: 'linear-gradient(91.59deg, #97E5F1 5.31%, #68CAD9 94.52%)',
});

export default screen;
