/**
 * This function returns a sorted the array of numbers in ascending order
 * @param {number[]} numbers
 * @returns {number[]}
 * @example - sort([1, 100000, 21, 30, 4]) => [1, 4, 21, 30, 100000]
 */
function sort(numbers) {
  let sorted = numbers.sort((a, b) => a - b);
  return sorted;
}
