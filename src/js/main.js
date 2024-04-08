import { log, domReady, raf } from "./util.js";
import StyleKeeper from "./classes/StyleKeeper.js";
import DOMKeeper from "./classes/DOMKeeper.js";

// javascript modules are loaded and executed after DOM is completely loaded
// no need for event listener on DOMContentLoaded

const dom = new DOMKeeper();
const style = new StyleKeeper();
const state = {};

domReady(() => {
  style.setOnetimeStyle();

  dom.mode.addEventListener("click", () => {
    updateMode();
  });
  updateMode();

  raf(run);
});

function updateMode() {
  if(dom.mode.checked) {
    dom.clock.classList.add("silly");
  } else {
    dom.clock.classList.remove("silly");
  }
}

function run() {
  const now = new Date();

  // seconds and minutes are ticking
  const s = 360 / 60 * now.getSeconds();
  const m = 360 / 60 * now.getMinutes();

  // hours are moving smoothly (hours + minuteFraction + secondFraction)
  const h = 360 / 12 * (now.getHours()%12) + 
            360 / 12 * now.getMinutes() / 60 +
            360 / 12 * now.getSeconds() / 60 / 60;


  // only update DOM if state has changed

  if(state.s !== s) {
    state.s = s;
    dom.seconds.style["rotate"] = `${s}deg`;
    for(let i=0; i<dom.sspan.length; i++) {
      dom.sspan[i].style["rotate"] = `-${s}deg`;
      dom.sspan[i].innerHTML = now.getSeconds();
    }
  }

  if(state.m !== m) {
    state.m = m;
    dom.minutes.style["rotate"] = `${m}deg`;
    for(let i=0; i<dom.mspan.length; i++) {
      dom.mspan[i].style["rotate"] = `-${m}deg`;
      dom.mspan[i].innerHTML = now.getMinutes();
    }
  }

  if(state.h !== h) {
    state.h = h;
    dom.hours.style["rotate"]   = `${h}deg`;
    for(let i=0; i<dom.hspan.length; i++) {
      dom.hspan[i].style["rotate"] = `-${h}deg`;
      // if hour is 0, the silly mode should show 12
      if(now.getHours()%12 === 0) {
        dom.hspan[i].innerHTML = 12;
      } else {
        dom.hspan[i].innerHTML = now.getHours()%12;
      }
    }
  }

  raf(run);
}
