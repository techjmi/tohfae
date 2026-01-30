import { isNil, isNumber, isString, isDate } from "./type";

export const formatNumber = (value, locale = "en-IN") => {
  if (isNil(value) || !isNumber(value)) return "";
  return Number(value).toLocaleString(locale);
};
export const formatDate = (date, locale = "en-IN", options = {}) => {
  if (isNil(date) || !isDate(date)) return "";
  return new Date(date).toLocaleDateString(locale, options);
};
export const formatTime = (date, locale = "en-IN", options = {}) => {
  if (isNil(date) || !isDate(date)) return "";
  return new Date(date).toLocaleTimeString(locale, options);
};
export const formatDateTime = (date, locale = "en-IN", options = {}) => {
  if (isNil(date) || !isDate(date)) return "";
  return new Date(date).toLocaleString(locale, options);
};

export const formatCurrency = (
  value,
  currency = "INR",
  locale = "en-IN"
) => {
  if (isNil(value) || !isNumber(value)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
