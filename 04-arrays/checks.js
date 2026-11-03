// Checks for Kata 4. You don't need to change this file.

const short = ["taco", "burrito", "nachos"];
const long = ["pho", "banh mi", "spring roll", "boba", "rice bowl"];
const twoItems = [{ name: "Taco", price: 4.5 }, { name: "Churro", price: 3 }];
const fourItems = [
  { name: "Pho", price: 12 },
  { name: "Boba", price: 5.5 },
  { name: "Banh Mi", price: 9 },
  { name: "Spring Roll", price: 4 },
];

drill("Drill A: get an item by its index");
rep("Rep 1: secondItem", function () {
  return checkCalls(secondItem, [[[short], "burrito"], [[long], "banh mi"]]);
});
rep("Rep 2: lastItem", function () {
  const result = checkCalls(lastItem, [[[short], "nachos"], [[long], "rice bowl"]]);
  if (result.status === "fail" && lastItem(long) === "spring roll") {
    return fail("Works for 3 items, but not 5. Use list.length - 1 so it works for any length.");
  }
  return result;
});
rep("Rep 3: howMany", function () {
  return checkCalls(howMany, [[[short], 3], [[long], 5], [[[]], 0]]);
});

// Checks a list: is it a list, is it long enough, is every item the right type?
function checkList(list, minLength, type) {
  if (!Array.isArray(list)) return fail("It should be a list, in [square brackets].");
  if (list.length < minLength) return fail("It has " + list.length + " items. It needs at least " + minLength + ".");
  for (let i = 0; i < list.length; i++) {
    if (typeof list[i] !== type) {
      return fail("Item " + i + " is " + show(list[i]) + ". Every item should be " + (type === "string" ? "text, in quotes." : "a number, no quotes."));
    }
  }
  return pass("It's " + show(list) + ".");
}

drill("Drill B: make an array");
rep("Rep 1: myMenuNames", function () { return checkList(myMenuNames, 3, "string"); });
rep("Rep 2: myPrices", function () { return checkList(myPrices, 3, "number"); });

drill("Drill C: a list of objects");
rep("Rep 1: firstPrice", function () {
  return checkCalls(firstPrice, [[[twoItems], 4.5], [[fourItems], 12]]);
});
rep("Rep 2: lastName", function () {
  return checkCalls(lastName, [[[twoItems], "Churro"], [[fourItems], "Spring Roll"]]);
});
rep("Rep 3: secondLabel", function () {
  return checkCalls(secondLabel, [[[twoItems], "Churro: $3"], [[fourItems], "Boba: $5.5"]]);
});

runKatas();
