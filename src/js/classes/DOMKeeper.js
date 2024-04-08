import {log, z} from "../util.js";

/*
  DOM Keeper
  Holds all DOM references in one place
*/
export default class DOMKeeper {
  constructor() {
    this.onetime = z("style.onetime");
    this.runtime = z("style.runtime");

    this.modeWrapper = z("section.mode");
    this.mode = z("section.mode input[type=checkbox]");

    this.clock   = z("section.clock");
    this.hours   = z("div.hours");
    this.minutes = z("div.minutes");
    this.seconds = z("div.seconds");

    this.hspan = z("div.hours span");
    this.mspan = z("div.minutes span");
    this.sspan = z("div.seconds span");
  }
}