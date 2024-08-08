/**
 * Calculates the mean (average) of an array of numbers.
 * @param {number[]} array - The array of numbers.
 * @returns {number} The mean of the array.
 */
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array - The array of numbers.
 * @returns {number} The median of the array.
 */
const getMedian = (array) => {
  // Sort the array in ascending order
  const sorted = array.sort((a, b) => a - b);
  const median =
    array.length % 2 === 0
      // If the length is even, the median is the average of the two middle numbers
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
      // If the length is odd, the median is the middle number
      : sorted[Math.floor(array.length / 2)];
  return median;
}

/**
 * Calculates the mode of an array of numbers.
 * @param {number[]} array - The array of numbers.
 * @returns {string | null} The mode of the array, or null if there is no mode.
 */
const getMode = (array) => {
  const counts = {};
  // Count the frequency of each number in the array
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })
  // If all numbers have the same frequency, there is no mode
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  // Find the number(s) with the highest frequency
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  // Filter the numbers that have the highest frequency
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", ");
}

/**
 * Calculates the range of an array of numbers.
 * @param {number[]} array - The array of numbers.
 * @returns {number} The range of the array.
 */
const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

/**
 * Calculates the variance of an array of numbers.
 * @param {number[]} array - The array of numbers.
 * @returns {number} The variance of the array.
 */
const getVariance = (array) => {
  const mean = getMean(array);
  // Calculate the sum of squared differences from the mean
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

/**
 * Calculates the standard deviation of an array of numbers.
 * @param {number[]} array - The array of numbers.
 * @returns {number} The standard deviation of the array.
 */
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  // Standard deviation is the square root of the variance
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

/**
 * Handles the form submission, calculates statistics, and updates the HTML elements.
 */
const calculate = () => {
  // Get the value from the input field and split it into an array of strings
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  // Convert the array of strings to numbers and filter out invalid values
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
  // Calculate statistics
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  // Update the HTML elements with the calculated values
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
}
