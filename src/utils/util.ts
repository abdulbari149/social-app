import { satisfies } from 'semver';
import { string } from 'yargs';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const omit = <T extends object, K extends keyof T>(data: T, ...keys: K[]): Pick<T, Exclude<keyof T, K>> => {
  const object = Object.entries(data).filter(([k]) => !keys.includes(k as K));
  return Object.fromEntries(object) as Pick<T, Exclude<keyof T, K>>;
};
