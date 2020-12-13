export const calculatorPrice = (prices, settings) => {
  return Object.keys(settings).reduce(
    (a, b) => a + (settings[b] ? prices[b] || 0 : 0),
    0
  );
};
