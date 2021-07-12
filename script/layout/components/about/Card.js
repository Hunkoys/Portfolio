import dom from '../../../../lib/superdom.js';
import theme, { font } from '../../theme.js';

function Card(heading, paragraph, color = 'black', x, y) {
  return dom
    .section(
      dom.h3(heading).style({
        fontSize: font.xl,
        fontWeight: font.bold,
        color,
        marginBottom: '20px',
      }),
      dom.p(paragraph).style({
        fontSize: font.m,
        textAlign: 'center',
      })
    )
    .style({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      padding: '35px 30px 40px',
      width: '225px',
      borderRadius: '30px',
      background: theme.background,
      boxShadow: '4px 4px 13px #00000020',
    });
}

export default Card;
