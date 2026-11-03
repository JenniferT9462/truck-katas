// Checks for Kata 5. You don't need to change this file.

const phoText = '{"name": "Pho", "price": 12}';
const tacoText = '{"name": "Taco", "price": 4.5}';
const menuText = '[{"name": "Taco", "price": 4.5}, {"name": "Pho", "price": 12}]';

// Did they return the text itself instead of parsing it?
function parsedCheck(fn, cases) {
  if (typeof fn !== "function") return checkCalls(fn, cases);
  const first = fn(cases[0][0][0]);
  if (typeof first === "string") return fail("It returned the text. Turn it into data with JSON.parse(text).");
  return checkCalls(fn, cases);
}

drill("Drill A: parse (text → data)");
rep("Rep 1: parseItem", function () {
  return parsedCheck(parseItem, [[[phoText], { name: "Pho", price: 12 }], [[tacoText], { name: "Taco", price: 4.5 }]]);
});
rep("Rep 2: priceFromJson", function () {
  return parsedCheck(priceFromJson, [[[phoText], 12], [[tacoText], 4.5]]);
});
rep("Rep 3: parseMenu", function () {
  const result = parsedCheck(parseMenu, [[[menuText], [{ name: "Taco", price: 4.5 }, { name: "Pho", price: 12 }]]]);
  if (result.status === "pass") return pass("Your list has " + parseMenu(menuText).length + " items.");
  return result;
});

// Is the fixed text valid JSON with the right data?
function checkFixed(text, original, hint) {
  if (text === original) return todo("Not fixed yet. Hint: " + hint);
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    return fail("Still not valid JSON. Hint: " + hint);
  }
  if (!same(data, { name: "pho", price: 12 })) {
    return fail("It's valid JSON now! But keep the name \"pho\" and the price 12 (a number). It gave " + show(data) + ".");
  }
  return pass("Valid JSON!");
}

drill("Drill B: fix the broken JSON");
rep("Rep 1: brokenA", function () {
  return checkFixed(brokenA, '{name: "pho", "price": 12}', "look at the names. Every name needs double quotes.");
});
rep("Rep 2: brokenB", function () {
  return checkFixed(brokenB, '{"name": "pho" "price": 12}', "look between the two items. What's missing?");
});
rep("Rep 3: brokenC", function () {
  return checkFixed(brokenC, '{"name": "pho", "price": 12,}', "look at the very end. JSON doesn't allow a comma after the last item.");
});

drill("Drill C: stringify (data → text)");
rep("Rep 1: toJson", function () {
  return checkCalls(toJson, [[[{ name: "Pho", price: 12 }], '{"name":"Pho","price":12}']]);
});
rep("Rep 2: prettyJson", function () {
  const result = checkCalls(prettyJson, [[[{ name: "Pho", price: 12 }], JSON.stringify({ name: "Pho", price: 12 }, null, 2)]]);
  if (result.status === "fail" && prettyJson({ name: "Pho", price: 12 }) === '{"name":"Pho","price":12}') {
    return fail("That's JSON, but all on one line. Add null, 2 inside the stringify parentheses.");
  }
  return result;
});

drill("Drill D: catch bad JSON (like Menu Maker)");
rep("Rep 1: safeParse", function () {
  const good = safeParse('{"price": 3}');
  if (good === undefined) return todo("It doesn't return anything yet. Return the parsed data inside try.");
  if (!same(good, { price: 3 })) return fail("Good JSON should give back the data. It gave " + show(good) + ".");
  let bad;
  try {
    bad = safeParse("{price: 3}");
  } catch (error) {
    return fail("It crashed on broken JSON. Put JSON.parse inside try { }, and return null inside catch { }.");
  }
  if (bad !== null) return fail("Broken JSON should give null. It gave " + show(bad) + ".");
  return pass("Good JSON gives data, broken JSON gives null.");
});

runKatas();
