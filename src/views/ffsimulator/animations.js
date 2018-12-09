import centers from '../../utils/files/country-centers';

const SCALE = 1;

const getCoordinates = (code) => {
  const info = centers[code];
  if(info === null) return null;
  return [info.long, info.lat];
}

const calculateDisplacement = (from, to) => {
  return { x: (to[0] - from[0]) * 1 / SCALE, y: (to[1] - from[1]) * 1 / SCALE };
}

const flip = (toBeFlipped) => {
  return [toBeFlipped[1], toBeFlipped[0]];
}

const create = (from, to, projection) => {
  let styleSheet = document.styleSheets[0];
  const displacement = calculateDisplacement(projection(getCoordinates(from)), projection(getCoordinates(to)));
  let animationName = `animation-${from}-${to}`;
  let keyframes =
    `@-webkit-keyframes ${animationName} {
      100% {-webkit-transform:translate(${displacement.x}px, ${displacement.y}px)}
  }`;

  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}

export default {
  SCALE, flip, create, getCoordinates
}