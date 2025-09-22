export const formatNumber = (num: number | null | undefined, digits = 2) => {
  if (num === null || num === undefined) return "N/A";
  return num.toFixed(digits);
};

export const formatCurrency = (num: number | null | undefined) => {
  if (num === null || num === undefined) return "N/A";
  return `$${num.toLocaleString()}`;
};
