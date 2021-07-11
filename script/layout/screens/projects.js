import dom from '../../../lib/superdom.js';
import theme from '../theme.js';
import Entry, { techTypes } from '../components/projects/Entry.js';

const html = ['HTML', techTypes.semantics];
const jsx = ['JSX', techTypes.semantics];

const css = ['CSS', techTypes.styles];
const sass = ['Sass', techTypes.styles];

const js = ['Javascript', techTypes.scripts];
const express = ['Express', techTypes.scripts];
const socketio = ['Socket.io', techTypes.scripts];

const react = ['React', techTypes.bigApi];

const ColorColor = Entry({
  title: 'Color Color',
  classification: 'Board Game',
  description: 'Which ever side consumes the most blocks when the game ends wins.',
  technologies: [react, jsx, sass, express, socketio],
  page: 'https://www.dominicvictoria.com/color-color/',
  repo: 'https://github.com/Hunkoys/color-color-react-1-client',
  gallery: dom.img('pics/color-color.png', `Color Color screenshots`).style({}),
});

const SimpleTimer = Entry({
  title: 'Simple Timer',
  classification: 'Productivity',
  description: 'Countdown timer with quirky UI elements and good keyboard integration.',
  technologies: [html, css, js],
  page: 'https://hunkoys.github.io/Timer/',
  repo: 'https://github.com/Hunkoys/Timer',
  gallery: dom.img('pics/simple-timer.png', 'Simple Timer screenshots', 626).style({
    borderRadius: '39px',
    boxShadow: '4px 4px 37px #00000033',
  }),
});

const entries = [ColorColor, SimpleTimer];

const screen = dom.article(...entries).style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.background,
});

export default screen;
