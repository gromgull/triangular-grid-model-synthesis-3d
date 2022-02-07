import { Euler } from "three";

const tau = Math.PI*2;

export const rotateY360 = (i, pos) => new Euler(0,Math.random()*tau,0);
export const rotateX15Y360 = (i, pos) => new Euler(Math.random()*15*tau/360,Math.random()*tau,0);

export const scale1_3 = (i, pos) => 1+Math.random()*3;
export const scale1_2 = (i, pos) => 1+Math.random()*2;

export const light25pct = (i, pos, color) => color.offsetHSL(0, 0, (Math.random()-0.5)*.5);
export const lightPlus50pct = (i, pos, color) => color.offsetHSL(0, 0, Math.random()*.5);

export const hue25pct = (i, pos, color) => color.offsetHSL((Math.random()-0.5)*.5, 0, 0);
