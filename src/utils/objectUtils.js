import _ from 'lodash';
import { getFileExtension } from './converts';

export const isEqual = (o1, o2) => _.isEqual(o1, o2);

export const isStringEqual = (s1, s2) =>
  new String(s1).valueOf() == new String(s2).valueOf();

export const isEmpty = (obj) => _.isEmpty(obj);

export const shortenFileName = (fileName) => {
  if (fileName.length <= 25) {
    return fileName;
  }
  return (
    fileName.substring(0, 10) +
    '...' +
    fileName.substring(fileName.length - 14, fileName.length)
  );
};
