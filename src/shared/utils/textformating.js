//this is the text formating utility function which will be used to handle the text formating of the app
import { isNil, isString } from "./type";
export const capitalize = (text = "") => {
  if (isNil(text) || !isString(text)) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};
export const titleCase = (text = "") => {
  if (isNil(text) || !isString(text)) return "";
  return text.split(" ").map(capitalize).join(" ");
};

export const truncate = (text = "", length = 100, suffix = "…") => {
  if (isNil(text) || !isString(text)) return "";
  return text.length > length ? text.slice(0, length) + suffix : text;
};

export const kebabCase = (text = "") => {
  if (isNil(text) || !isString(text)) return "";
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

export const snakeCase = (text = "") => {
  if (isNil(text) || !isString(text)) return "";
  return text
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]/g, "");
};