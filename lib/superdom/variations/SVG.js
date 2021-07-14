import SuperDom from '../SuperDom.js';

//{ width = 0, height = 0, viewBox = '0 0 0 0', fill = 'none', xmlns = 'http://www.w3.org/2000/svg', content }

export default class SVG extends SuperDom {
  constructor(options) {
    super(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
    this.options = options;

    this.element.setAttribute('width', `${options.width}px`);
    this.element.setAttribute('height', `${options.height}px`);
    this.element.setAttribute('viewBox', options.viewBox || `0 0 ${options.width} ${options.height}`);
    this.element.setAttribute('fill', options.fill || 'none');
    this.element.fill = options.fill || 'none';

    this.content(options.contents);
  }

  content(contents) {
    for (const content of contents) {
      const element = document.createElementNS('http://www.w3.org/2000/svg', content.type);
      delete content.type;

      for (const attrib in content) {
        element.setAttribute(attrib, content[attrib]);
      }

      this.child(element);
    }
  }
}
