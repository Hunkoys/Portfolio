import SuperDom from './superdom/SuperDom.js';
import Anchor from './superdom/variations/Anchor.js';
import Image from './superdom/variations/Image.js';

const dom = {
  h1(...children) {
    return SuperDom.create('h1').child(...children);
  },
  h2(...children) {
    return SuperDom.create('h2').child(...children);
  },
  h3(...children) {
    return SuperDom.create('h3').child(...children);
  },
  h4(...children) {
    return SuperDom.create('h4').child(...children);
  },
  h5(...children) {
    return SuperDom.create('h5').child(...children);
  },
  h6(...children) {
    return SuperDom.create('h6').child(...children);
  },
  p(...children) {
    return SuperDom.create('p').child(...children);
  },
  strong(...children) {
    return SuperDom.create('strong').child(...children);
  },
  em(...children) {
    return SuperDom.create('em').child(...children);
  },
  span(...children) {
    return SuperDom.create('span').child(...children);
  },
  div(...children) {
    return SuperDom.create('div').child(...children);
  },
  article(...children) {
    return SuperDom.create('article').child(...children);
  },
  section(...children) {
    return SuperDom.create('section').child(...children);
  },
  main(...children) {
    return SuperDom.create('main').child(...children);
  },
  nav(...children) {
    return SuperDom.create('nav').child(...children);
  },
  aside(...children) {
    return SuperDom.create('aside').child(...children);
  },
  header(...children) {
    return SuperDom.create('header').child(...children);
  },
  footer(...children) {
    return SuperDom.create('footer').child(...children);
  },
  button(...children) {
    return SuperDom.create('button').child(...children);
  },
  img(src, alt, width, height) {
    src = `./resources/img/${src}`;
    return new Image(src, alt, width, height);
  },
  a(href, ...children) {
    return new Anchor(href, ...children);
  },
};

export default dom;
export { SuperDom };
