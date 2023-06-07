console.log("This is train.js");

/**
 *   F-Task: Shunday function tuzing, unga string argument pass bolsin.
 *  Function ushbu agrumentdagi faqat digitlarni yangi stringda return qilsin!
 */
const data = "ad5we34jkf898877";
const findDigits = (input) => {
  const splitData = input.split("");
  const filteredValue = splitData.filter((item) => {
    for (let i = 0; i <= 9; i++) {
      if (item == i) {
        return item;
      }
    }
  });
  return filteredValue.join("");
};
const result = findDigits(data);
console.log("Natija:", result);
