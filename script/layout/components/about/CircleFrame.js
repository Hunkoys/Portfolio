import dom from '../../../../lib/superdom.js';

const DEF_SIZE = 260;
const BORDER_SIZE = 15;

function CircleFrame(src, alt, width = DEF_SIZE, x = 0, y = 0) {
  return dom
    .div(
      dom.img(src, alt, width - BORDER_SIZE * 2).style({
        position: 'relative',
        top: `${y}px`,
        left: `${x}px`,
        height: 'auto',
      })
    )
    .style({
      height: `${DEF_SIZE}px`,
      width: `${DEF_SIZE}px`,
      overflow: 'hidden',
      border: `${BORDER_SIZE}px solid #A8DFE9`,
      borderRadius: `${DEF_SIZE / 2}px`,
    });
}

export default CircleFrame;
