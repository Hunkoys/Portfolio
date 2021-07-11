import dom from '../../../../lib/superdom.js';
import theme, { font } from '../../theme.js';

function Button(text, icon, src) {
  const button = src ? dom.a(src) : dom.button();

  return button
    .child(
      dom.img(icon, `${text} icon`).style({
        marginRight: '10px',
      }),
      dom.span(text)
    )
    .style({
      display: 'flex',
      fontSize: font.s,
      fontWeight: font.bold,
      color: theme.subtleText,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    });
}

export default Button;
