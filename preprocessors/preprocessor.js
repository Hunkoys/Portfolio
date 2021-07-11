const elements = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'span',
  'div',
  'article',
  'section',
  'main',
  'nav',
  'aside',
  'header',
  'footer',
];

let output = '';

for (const elem of elements) {
  output =
    output +
    `
  
  ${elem}(...children) {
    return SuperDom.create('${elem}').child(...children);
  },`;
}

console.log(output);
