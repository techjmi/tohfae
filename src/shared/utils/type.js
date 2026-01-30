// shared/utils/type.js

export const isBrowser = typeof window !== "undefined";
export const isServer = !isBrowser;

export const isFunction = (v) => typeof v === "function";
export const isString = (v) => typeof v === "string";
export const isNumber = (v) => typeof v === "number";
export const isBoolean = (v) => typeof v === "boolean";
export const isUndefined = (v) => typeof v === "undefined";
export const isNull = (v) => v === null;
export const isNil = (v) => v == null;
export const isEmpty = (v) => isNil(v) || isEmptyString(v);

export const isArray = Array.isArray;

export const isObject = (v) =>
  Object.prototype.toString.call(v) === "[object Object]";

export const isEmptyObject = (v) =>
  isObject(v) && Object.keys(v).length === 0;

export const isEmptyArray = (v) =>
  Array.isArray(v) && v.length === 0;

export const isDate = (v) =>
  v instanceof Date && !Number.isNaN(v.getTime());

export const isRegExp = (v) => v instanceof RegExp;
export const isError = (v) => v instanceof Error;

export const isPromise = (v) =>
  !!v && typeof v.then === "function";

export const isFiniteNumber = (v) =>
  typeof v === "number" && Number.isFinite(v);

export const isEmptyString = (v) =>
  typeof v === "string" && v.trim() === "";

export const isNonEmptyString = (v) =>
  typeof v === "string" && v.trim().length > 0;
