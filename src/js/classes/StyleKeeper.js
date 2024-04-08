import { log } from "../util.js";
import DOMKeeper from "./DOMKeeper.js";
import SVG from "./SVG.js";

const dom = new DOMKeeper();

export default class StyleKeeper {
  constructor() {
    // gather color variables defined in css :root
    this.colors = {};

    const comp = getComputedStyle(document.documentElement);

    // two ways to get the css variables:

    // 1) ugly, but always up to date when more variables are added to css
    /*
    Object.keys(comp)
      .filter(i => comp[i].startsWith("--")) // --text-color
      .map(i => {
        this.colors[comp[i].slice(2)] = comp.getPropertyValue(comp[i]); // text-color
      });
    */

    // 2) easy-to-read, but the variable names need to repeated
    [
      "clock-face-background-color",
      "clock-face-border-color",
      "clock-face-steps-color",
      "clock-hand-hours-color",
      "clock-hand-minutes-color",
      "clock-hand-seconds-color"
    ].map(key => {
      this.colors[key] = comp.getPropertyValue(`--${key}`);
    });

  }

  /*
    set one-time css
  */
  setOnetimeStyle() {
    dom.onetime.innerHTML = `
      .clock {
        ${
          new SVG([
            `<circle`,
            ` stroke="${this.colors["clock-face-border-color"]}"`,
            ` stroke-width="1"`,
            ` fill="${this.colors["clock-face-background-color"]}"`,
            ` cx="50" cy="50" r="49" />`,

            `<g`,
            ` stroke="${this.colors["clock-face-steps-color"]}"`,
            ` stroke-width="1"`,
            ` fill="none">`,

            '<g stroke-width="2">',
            ...[0, 90, 180, 270].map(i =>
            `<path d="M50,1 v3" transform="rotate(${i},50,50)" />`),
            '</g>',

            ...[30,60,120,150,210,240,300,330].map(i =>
            `<path d="M50,1 v2" transform="rotate(${i}, 50, 50)" />`),

            '</g>',
          ]).toBgImage()
        }
      }

      .clock .hours:before {
        ${
          new SVG([
            `<path`,
            ` stroke="${this.colors["clock-hand-hours-color"]}"`,
            ` stroke-width="4"`,
            ` fill="none"`,
            ` d="M2,60 v-35"`,
            `/>`,
          ], "0 0 4 100").toBgImage()
        }
      }

      .clock .minutes:before {
        ${
          new SVG([
            `<path`,
            ` stroke="${this.colors["clock-hand-minutes-color"]}"`,
            ` stroke-width="2"`,
            ` fill="none"`,
            ` d="M2,61 v-57"`,
            `/>`,
          ], "0 0 4 100").toBgImage()
        }
      }

      .clock .seconds:before {
        ${
          new SVG([
            `<path`,
            ` stroke="${this.colors["clock-hand-seconds-color"]}"`,
            ` stroke-width="1"`,
            ` fill="none"`,
            ` d="M2,65 v-61"`,
            `/>`,
            `<circle`,
            ` fill="${this.colors["clock-hand-seconds-color"]}"`,
            ` stroke="none"`,
            ` cx="2" cy="50" r="1.5"`,
            `/>`,
          ], "0 0 4 100").toBgImage()
        }
      }
    `
  }

  /*
    set run-time css
  */
  setRuntimeStyle() {

  }
}