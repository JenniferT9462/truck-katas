// Checks for Kata 9. You don't need to change this file.
// This kata has no script.js. The checker looks at my-page.html instead.

const scriptLoaded = true;
let myDoc = null;

// A class can be a plain name, or { test: /pattern/, name: "how to describe it" }.
function classMatches(element, wanted) {
  const list = Array.from(element.classList);
  if (typeof wanted === "string") return list.includes(wanted);
  return list.some(function (c) { return wanted.test.test(c); });
}
function className(wanted) {
  return typeof wanted === "string" ? wanted : wanted.name;
}

// Checks one element for a few classes.
function checkClasses(element, label, classes) {
  const missing = classes.filter(function (wanted) { return !classMatches(element, wanted); });
  if (missing.length === 0) return pass();
  const names = missing.map(className).join(", ");
  if (missing.length === classes.length) return todo("Add to " + label + ": " + names);
  return almost(label + " still needs: " + names);
}

function findId(id) {
  return myDoc.getElementById(id);
}
function lost(id) {
  return fail("Can't find id=\"" + id + "\" in my-page.html. Did it get renamed or deleted? Keep every id.");
}
function needClasses(id, classes) {
  const element = findId(id);
  if (!element) return lost(id);
  return checkClasses(element, "#" + id, classes);
}

const anyGap = { test: /^gap-[1-5]$/, name: "a gap class like gap-3" };
const anyGutter = { test: /^g-[1-5]$/, name: "a gutter class like g-3" };
const buttonColor = { test: /^btn-(?!lg$|sm$)/, name: "a color like btn-warning" };
const mdColumn = { test: /^col-md-([1-9]|1[0-2])$/, name: "col-md-4" };

drill("Drill A: text and buttons");
rep("Rep 1: #truck-name", function () {
  return needClasses("truck-name", ["display-4", "text-center"]);
});
rep("Rep 2: #tagline", function () {
  return needClasses("tagline", ["lead"]);
});
rep("Rep 3: #order-btn", function () {
  return needClasses("order-btn", ["btn", buttonColor, "btn-lg"]);
});

drill("Drill B: color and spacing");
rep("Rep 1: #hero", function () {
  return needClasses("hero", ["bg-dark", "text-white", "py-5"]);
});
rep("Rep 2: #special", function () {
  return needClasses("special", ["badge", "bg-warning"]);
});

drill("Drill C: flex");
rep("Rep 1: #contact", function () {
  return needClasses("contact", ["d-flex", anyGap]);
});
rep("Rep 2: #steps", function () {
  const result = needClasses("steps", ["d-flex", "flex-column", "flex-md-row"]);
  if (result.status !== "pass") return result;
  return pass("Make the page wider and narrower: the steps stack on a phone.");
});

// The columns inside #menu-grid (the example + the two to do).
function menuColumns() {
  const grid = findId("menu-grid");
  if (!grid) return null;
  return Array.from(grid.children);
}

drill("Drill D: grid and cards");
rep("Rep 1: #menu-grid", function () {
  return needClasses("menu-grid", ["row", anyGutter]);
});
rep("Rep 2: the columns", function () {
  const columns = menuColumns();
  if (!columns) return lost("menu-grid");
  if (columns.length < 3) return fail("#menu-grid should have 3 columns inside it. It has " + columns.length + ".");
  let done = 0;
  for (let i = 0; i < columns.length; i++) {
    if (classMatches(columns[i], "col-12") && classMatches(columns[i], mdColumn)) done = done + 1;
  }
  if (done === columns.length) return pass();
  if (done === 1) return todo("Give the Burrito and Churro columns the same classes as the example: col-12 col-md-4");
  return fail(done + " of " + columns.length + " columns done. Each one needs col-12 col-md-4.");
});
rep("Rep 3: the cards", function () {
  const columns = menuColumns();
  if (!columns) return lost("menu-grid");
  let done = 0;
  for (let i = 0; i < columns.length; i++) {
    const card = columns[i].firstElementChild;
    const body = card && card.firstElementChild;
    const title = columns[i].querySelector("h3");
    if (card && body && title && classMatches(card, "card") && classMatches(body, "card-body") && classMatches(title, "card-title")) {
      done = done + 1;
    }
  }
  if (done === columns.length) return pass("Your menu is a grid of cards!");
  if (done <= 1) return todo("Inside Burrito and Churro: the outer div gets card, the next div gets card-body, the h3 gets card-title.");
  return fail(done + " of " + columns.length + " cards done. Outer div: card. Next div: card-body. The h3: card-title.");
});

// Wait for my-page.html to load in the frame, then check it.
const frame = document.getElementById("my-page");

function startChecking() {
  try {
    myDoc = frame.contentDocument;
    if (!myDoc || !myDoc.body) throw new Error("no page");
  } catch (error) {
    const summary = document.getElementById("summary");
    summary.textContent = "⚠️ Can't look inside my-page.html. Open this page with Live Server (right-click index.html → Open with Live Server).";
    summary.className = "warning";
    return;
  }
  runKatas();
}

if (frame.contentDocument && frame.contentDocument.readyState === "complete" && frame.contentDocument.URL !== "about:blank") {
  startChecking();
} else {
  frame.addEventListener("load", startChecking);
}
