export const removeFalsyValues = <T extends { [key: string]: any }>(obj: T) => {
  Object.keys(obj).forEach(key => !obj[key] && delete obj[key]);

  return obj;
};
