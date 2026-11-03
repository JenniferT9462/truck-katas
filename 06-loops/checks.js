// Checks for Kata 6. You don't need to change this file.

const testMenu = [
  { name: "Taco", price: 4.5 },
  { name: "Burrito", price: 9 },
  { name: "Nachos", price: 6.25 },
  { name: "Churro", price: 3 },
];
const otherMenu = [
  { name: "Pho", price: 12 },
  { name: "Boba", price: 4 },
];

// Right answer without a for loop? Friday needs one, so it's "almost".
function needsFor(fn, result) {
  if (result.status === "pass" && !codeHas(fn, "for (") && !codeHas(fn, "for(")) {
    return almost("Right answer! Now write it with a for loop. Friday's assignment needs one.");
  }
  return result;
}

drill("Drill A: a for loop that adds up");
rep("Rep 1: menuTotal", function () {
  const result = checkCalls(menuTotal, [[[testMenu], 22.75], [[otherMenu], 16], [[[]], 0]]);
  if (result.status === "fail" && menuTotal(testMenu) === 3) {
    return fail("It only gave the last price. Is let total = 0; inside the loop? Move it above the loop.");
  }
  return needsFor(menuTotal, result);
});
rep("Rep 2: totalQuantity", function () {
  const orders = [{ item: "Taco", quantity: 2 }, { item: "Pho", quantity: 5 }];
  const more = [{ item: "Boba", quantity: 1 }, { item: "Taco", quantity: 3 }, { item: "Churro", quantity: 4 }];
  return needsFor(totalQuantity, checkCalls(totalQuantity, [[[orders], 7], [[more], 8]]));
});
rep("Rep 3: countCheap", function () {
  return needsFor(countCheap, checkCalls(countCheap, [[[testMenu], 2], [[otherMenu], 1]]));
});

// Runs a forEach function on a test list (not on the page) and checks the <li>s it made.
function checkShown(fn, items, labelFor) {
  if (typeof fn !== "function") return fail("That isn't a function yet. Write it with the word function.");
  const list = document.createElement("ul");
  fn(items, list);
  if (list.children.length === 0) return todo("No <li>s yet. Make one with document.createElement(\"li\") and appendChild it to list.");
  if (list.children.length !== items.length) {
    return fail("It made " + list.children.length + " <li>s for " + items.length + " items. It should make one each.");
  }
  for (let i = 0; i < items.length; i++) {
    const text = list.children[i].textContent;
    if (text !== labelFor(items[i])) {
      return fail("<li> " + (i + 1) + " says " + show(text) + ". It should say " + show(labelFor(items[i])) + ".");
    }
  }
  if (codeHas(fn, "innerHTML")) return almost("It works, but use textContent, not innerHTML. That's our house rule.");
  if (!codeHas(fn, "forEach")) return almost("It works! Now write it with forEach. Friday's assignment needs it.");
  return pass();
}

drill("Drill B: forEach onto the page");
rep("Rep 1: showMenu", function () {
  return checkShown(showMenu, testMenu, function (item) { return item.name + ": $" + item.price; });
});
rep("Rep 2: showTags", function () {
  return checkShown(showTags, ["vegan", "spicy", "local"], function (tag) { return tag; });
});

runKatas();

// Your own menu, on the page (once showMenu works).
try {
  showMenu(myMenu, document.getElementById("my-menu"));
} catch (error) {
  // showMenu isn't ready yet. That's fine.
}
