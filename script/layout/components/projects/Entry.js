import dom from '../../../../lib/superdom.js';
import theme, { font } from '../../theme.js';

export const techTypes = {
  bigApi: '#F28BEE',
  semantics: '#7BCB7A',
  styles: '#65CCCC',
  scripts: '#BF8BF2',
};

function Entry({ title, classification, description, technologies = [], page, repo, gallery }) {
  const info = dom.section().style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: '130px',
    padding: '60px 0',
    height: '100%',
    width: '500px',
  });

  const entry = dom
    .article(
      info.child(TextGroup({ title, classification, description, technologies }), LinkGroup({ page, repo })),
      gallery
    )
    .style({
      display: 'flex',
      padding: '260px 0',
      height: '1080px',
    });

  return entry;
}

function Title(text) {
  return dom.h3(text).style({
    fontSize: font.xxl,
    fontWeight: font.bold,
  });
}

function Classification(text) {
  return dom.h4(text).style({
    fontSize: font.l,
    fontWeight: font.bold,
    marginBottom: '48px',
  });
}

function Description(text) {
  return dom.p(text).style({
    fontSize: font.m,
    marginBottom: '25px',
  });
}

function Technology(text, color) {
  return dom.p(text).style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: color,
    padding: '10px',
    marginRight: '12px',
    height: '24px',
    borderRadius: '6px',
    color: `${theme.accentText}DD`,
  });
}

function Technologies(pairs) {
  const list = pairs.map(([text, color]) => Technology(text, color));

  return dom.section(...list).style({
    display: 'flex',
  });
}

function TextGroup({ title, classification, description, technologies }) {
  return dom.div(Title(title), Classification(classification), Description(description), Technologies(technologies));
}

function Link(text, icon, url) {
  return dom
    .a(
      url,
      dom.img(icon, `${text} icon`).style({
        marginRight: '10px',
      }),
      dom.span(text)
    )
    .target('_blank')
    .style({
      display: 'flex',
      alignItems: 'center',

      padding: '0 30px',
      height: '45px',
      borderRadius: '100px',
      fontSize: font.s,
      textDecoration: 'none',

      boxShadow: '1px 1px 9px #00000021',
    });
}

function LinkGroup({ page, repo }) {
  return dom
    .div(
      Link('CHECK IT OUT', 'icons/app.png', page).style({
        border: `1px solid ${theme.action}`,
        background: theme.action,
        color: theme.accentText,
        marginRight: '15px',
      }),
      Link('REPOSITORY', 'icons/github-accent.png', repo).style({
        border: `1px solid ${theme.action}`,
        color: theme.action,
      })
    )
    .style({
      display: 'flex',
    });
}

export default Entry;
