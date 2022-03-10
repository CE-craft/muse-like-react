// Limit speed withing range
export const speedThreshold = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};
