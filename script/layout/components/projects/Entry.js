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
    flexShrink: 0,
    marginRight: '80px',
    padding: '60px 0',
    height: '100%',
    width: '330px',
  });

  const entry = dom
    .article(
      info.child(TextGroup({ title, classification, description, technologies }), LinkGroup({ page, repo })),
      gallery
    )
    .style({
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '120px 0',
      // margin: '100px 0',
      height: '670px',
      width: '75%',
      maxWidth: '1030px',
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
    marginBottom: '34px',
  });
}

function Description(text) {
  return dom.p(text).style({
    fontSize: font.m,
    marginBottom: '16px',
  });
}

function Technology(text, color) {
  return dom.p(text).style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: color,
    padding: '8px',
    marginRight: '7px',
    height: '16px',
    borderRadius: '4px',
    fontSize: font.s,
    color: `${theme.accentText}F0`,
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
    .style({
      display: 'flex',
      alignItems: 'center',

      padding: '0 20px',
      height: '37px',
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
