/**
 * This function returns a sorted the array of numbers in ascending order
 * @param {number[]} numbers
 * @returns {number[]}
 * @example - sortNumberArray([1, 100000, 21, 30, 4]) => [1, 4, 21, 30, 100000]
 */
function sortNumberArray(numbers) {
  let sorted = numbers.sort((a, b) => a - b);
  return sorted;
}

/**
 * This function reads a file and returns the content
 * @param {string} filePath
 * @returns {string}
 * @example - readFile('test.txt') => 'Hello World'
 */
function readFile(filePath) {
  let fs = require("fs");
  let content = fs.readFileSync(filePath, "utf8");
  return content;
}

/**
 * This function generates a unique ID
 * @returns {string}
 * @example - generateID() => '5e2a3c1e-6b9f-4d9f-9a0a-9e6d8a8f8d5f'
 */
function generateID() {
  const idTemplate = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  const id = idTemplate.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });

  return id;
}

/**
 * This function generates a human readable date time string
 * @returns {string}
 * @example - generateDateTime() => '2020-01-28 12:00:00'
 */
function generateDateTime() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  let dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return dateTime;
}
