// shared/utils/compare.js
//this is the compare utility function which will be used to handle the compare functionality of the app
export const comparePrimitive = (a, b) => {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  return a > b ? 1 : -1;
};

export const compareNumber = (a, b) => {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  return a - b;
};

export const sortBy = (array = [], key, direction = "asc", parser) => {
  const sorted = [...array];

  sorted.sort((a, b) => {
    const aValue = key ? a?.[key] : a;
    const bValue = key ? b?.[key] : b;

    const vA = parser ? parser(aValue) : aValue;
    const vB = parser ? parser(bValue) : bValue;

    const result = comparePrimitive(vA, vB);
    return direction === "asc" ? result : -result;
  });

  return sorted;
};

export const isEqual = (a, b) => a === b;

export const deepEqual = (a, b) => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a == null || b == null) return false;

  if (typeof a !== "object") return a === b;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
};
