import dom from '../../../lib/superdom.js';
import Card from '../components/about/Card.js';
import CircleFrame from '../components/about/CircleFrame.js';
import theme from '../theme.js';

const DEFAULT = undefined;

const start = CircleFrame('pics/face.jpg', 'Profile Picture', DEFAULT, 0, -40).style({
  position: 'relative',
  left: '335px',
  marginBottom: '30px',
});
const end = CircleFrame('pics/nanadaime.gif', 'Bad Ass Person', 400, -80).style({
  position: 'relative',
  top: '-150px',
  left: '780px',
});

// const path = dom.img('pics/path.svg', 'Dashed Line Path');
const path = dom.svg({
  width: 888,
  height: 928,
  contents: [
    {
      type: 'path',
      d: 'M443.876 4C443.876 106.92 181.544 4 181.544 125.299C181.544 246.598 330.719 201.641 416.782 189.199C554.666 169.266 574.245 177.32 649.789 189.199C725.333 201.078 824.589 231.524 866.539 320.959C922.64 440.561 833.071 555.688 746.37 566.949C659.67 578.21 525.158 533.302 380.445 510.965C235.731 488.628 4.00008 503.896 4 682.593C3.99992 870.62 166.882 912.75 283.544 921.797C400.207 930.845 691.865 909.639 763.902 901.157',
      stroke: '#3F3F3F',
      'stroke-width': '8',
      'stroke-linecap': 'round',
      'stroke-dasharray': '20 40',
    },
  ],
});

const masterCard = Card(
  'MASTER',
  'Before you can start to guide others, you first have to guide your self.',
  theme.accent2,
  520,
  320
);
const inspiredCard = Card(
  'INSPIRE',
  dom.span(
    `Show everyone that just because things are hard, it doesn’t mean it has to be difficult. `,
    dom.strong(`We have each other.`)
  ),
  theme.accent,
  160,
  630
);
const changeCard = Card(
  'CHANGE',
  `Together, we’ll move forward. Not for the sake of moving forward, but for making the world a better place.`,
  theme.accent3,
  415,
  1040
);

const box = dom.div(start, path, masterCard, inspiredCard, changeCard, end).style({
  display: 'inline-block',

  position: 'relative',
});

const screen = dom.section(box).style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '140px',
  paddingBottom: '200px',
  background: 'linear-gradient(91.59deg, #97E5F1 5.31%, #68CAD9 94.52%)',
});

export default screen;
