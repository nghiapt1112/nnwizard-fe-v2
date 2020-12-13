import _ from 'lodash';

export const isEqual = (o1, o2) => _.isEqual(o1, o2);

export const isStringEqual = (s1, s2) =>
  new String(s1).valueOf() == new String(s2).valueOf();

export const isEmpty = (obj) => _.isEmpty(obj);
