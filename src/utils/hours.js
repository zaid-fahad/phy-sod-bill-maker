// src/utils/hours.js
export const calculateHours = (start, end) => {
  if (!start || !end) return 0;
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  const diff = (endH + endM / 60) - (startH + startM / 60);
  return diff > 0 ? parseFloat(diff.toFixed(2)) : 0;
};
