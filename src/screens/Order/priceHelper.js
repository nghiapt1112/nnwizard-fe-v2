/**
 *
 * @param priceHolder: là  1 object, lưu các properties theo dạng key:value
 * @param settings: string[] các key
 * @returns {sum of values by keys}
 */
export const calculatorPrice = (priceHolder, settings) => {
  return settings.reduce(
    (acc, curr) => acc + (priceHolder[curr] ? priceHolder[curr] : 0),
    0
  );
};
