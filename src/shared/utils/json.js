//this is a json utility function which will be used to handle the json data
export const safeParseJSON = (s, fallback = null) => {
    try {
        return JSON.parse(s);
    } catch {
        return fallback;
    }
};
export const toJSONString = (data, space = 2) => {
  try {
    return JSON.stringify(data, null, space);
  } catch (error) {
    console.error("JSON stringify failed:", error);
    return null;
  }
};
