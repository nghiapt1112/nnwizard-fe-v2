export const isEqual = (o1, o2) => o1 === o2;

export const isStringEqual = (s1, s2) =>
  new String(s1).valueOf() == new String(s2).valueOf();
