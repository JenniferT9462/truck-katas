// START-OVER COPY. This page doesn't use this file.
// To do the kata again: copy everything below, and paste it over everything in script.js.
// (Make a save point first, so your old work is safe on GitHub.)

// Kata 5: JSON
// JSON is data written as TEXT. JSON.parse turns text into real data.
// JSON.stringify turns data back into text.
// The 4 rules: names in double quotes · text in double quotes · commas between items · no comma after the last one.

// ---------- Drill A: parse (text → data) ----------
// Example:
const exampleText = '{"name": "Taco", "price": 4.5}';
const exampleItem = JSON.parse(exampleText);
console.log("Example:", exampleItem.price);   // 4.5

// Rep 1: parse the text and return the object.
//   parseItem('{"name": "Pho", "price": 12}')  →  { name: "Pho", price: 12 }
function parseItem(text) {
  // your code here
}

// Rep 2: write a function called priceFromJson(text) that parses the text and returns just the price.
//   priceFromJson('{"name": "Pho", "price": 12}')  →  12

// Rep 3: write a function called parseMenu(text) that parses a JSON LIST and returns it.
//   parseMenu('[{"name": "Taco", "price": 4.5}, {"name": "Pho", "price": 12}]')  →  a list with 2 items


// ---------- Drill B: fix the broken JSON ----------
// Each one breaks one rule. Fix the text so it's valid JSON.
// Keep the name "pho" and the price 12.

// Rep 1:
const brokenA = '{name: "pho", "price": 12}';

// Rep 2:
const brokenB = '{"name": "pho" "price": 12}';

// Rep 3:
const brokenC = '{"name": "pho", "price": 12,}';


// ---------- Drill C: stringify (data → text) ----------
// Example:
const exampleBack = JSON.stringify(exampleItem);
console.log("Example:", exampleBack, typeof exampleBack);   // {"name":"Taco","price":4.5} string

// Rep 1: turn the object into JSON text and return it.
//   toJson({ name: "Pho", price: 12 })  →  '{"name":"Pho","price":12}'
function toJson(item) {
  // your code here
}

// Rep 2: write a function called prettyJson(item) that returns JSON.stringify(item, null, 2).
// The 2 means "indent by 2 spaces", so it's easy to read.


// ---------- Drill D: catch bad JSON (like Menu Maker) ----------
// Rep 1: return the parsed data. If the JSON is broken, return null instead of crashing.
// Use try / catch.
//   safeParse('{"price": 3}')  →  { price: 3 }      safeParse('{price: 3}')  →  null
function safeParse(text) {
  // your code here
}


// (Leave this last line alone. It tells the checker your file ran.)
const scriptLoaded = true;
