// Checks for Kata 1. You don't need to change this file.

function checkText(value) {
  if (typeof value === "string" && value.length > 0) return pass("It holds " + show(value) + ".");
  if (typeof value === "string") return fail("It's empty. Put your text between the quotes.");
  return fail("It holds " + show(value) + ". Text needs quotes around it.");
}

function checkNumber(value, expected) {
  if (value === expected) return pass("It's " + expected + ".");
  if (typeof value === "string") return fail("It holds the text " + show(value) + ". Numbers have no quotes.");
  return fail("It's " + show(value) + ", but it should end at " + expected + ".");
}

drill("Drill A: const holds text");
rep("Rep 1: truckName", function () { return checkText(truckName); });
rep("Rep 2: truckCity", function () { return checkText(truckCity); });
rep("Rep 3: bestSeller", function () { return checkText(bestSeller); });

drill("Drill B: let can change");
rep("Rep 1: ordersToday", function () { return checkNumber(ordersToday, 3); });
rep("Rep 2: tipJar", function () { return checkNumber(tipJar, 7); });
rep("Rep 3: cupsLeft", function () { return checkNumber(cupsLeft, 6); });

drill("Drill C: numbers and true/false");
rep("Rep 1: sodaPrice", function () { return checkNumber(sodaPrice, 2.5); });
rep("Rep 2: hasVeggie", function () {
  if (hasVeggie === true) return pass("It's true.");
  if (hasVeggie === "true") return fail('It holds the text "true". true and false have no quotes.');
  return fail("It's " + show(hasVeggie) + ", but it should be true.");
});
rep("Rep 3: seats", function () { return checkNumber(seats, 12); });

runKatas();
