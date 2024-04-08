const log = console.log;

// zQuery <3
const z = selector => {
  const el = document.querySelectorAll(selector);
  if (el.length == 1) {
    return el[0];
  } else if (el.length == 0) {
    return false;
  } else {
    return el;
  }
}

const domReady = cb => {
  document.readyState !== "loading" ?
    cb() : document.addEventListener("DOMContentLoaded", cb);
}

const pad2 = n => {
  return ("0" + n).slice(-2);
}

const raf = window.requestAnimationFrame 
  || window.mozRequestAnimationFrame 
  || window.webkitRequestAnimationFrame 
  || window.msRequestAnimationFrame;

export { log, z, domReady, pad2, raf };