import {
  add as addLodash,
  subtract as subtractLodash,
  multiply as multiplyLodash,
  divide as divideLodash,
} from 'lodash-es';

export const add = (a: number, b: number) => addLodash(a, b);

export const subtract = (a: number, b: number) => subtractLodash(a, b);

export const multiply = (a: number, b: number) => multiplyLodash(a, b);

export const divide = (a: number, b: number) => divideLodash(a, b);
