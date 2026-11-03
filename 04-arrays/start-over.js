// START-OVER COPY. This page doesn't use this file.
// To do the kata again: copy everything below, and paste it over everything in script.js.
// (Make a save point first, so your old work is safe on GitHub.)

// Kata 4: Arrays
// An array is a list in [square brackets]. Each item has an index, and the first one is 0.
// Each drill has an Example (already done) and Reps for you to do.

// ---------- Drill A: get an item by its index ----------
// Example:
function firstItem(list) {
  return list[0];
}
console.log("Example:", firstItem(["taco", "burrito", "nachos"]));   // taco

// Rep 1: return the SECOND item.   secondItem(["taco", "burrito", "nachos"])  →  "burrito"
function secondItem(list) {
  // your code here
}

// Rep 2: write a function called lastItem(list) that returns the LAST item, however long the list is.
//   lastItem(["taco", "burrito", "nachos"])  →  "nachos"

// Rep 3: write a function called howMany(list) that returns how many items are in the list.
//   howMany(["taco", "burrito"])  →  2


// ---------- Drill B: make an array ----------
// Example:
const exampleMenu = ["taco", "burrito", "nachos"];

// Rep 1: make a const called myMenuNames: a list of at least 3 of YOUR item names (text).

// Rep 2: make a const called myPrices: a list of 3 prices (numbers, no quotes).


// ---------- Drill C: a list of objects ----------
// A menu is a list, and each item in it is an object.
// Example:
function firstName(menu) {
  return menu[0].name;
}
console.log("Example:", firstName([{ name: "Taco", price: 4.5 }, { name: "Churro", price: 3 }]));   // Taco

// Rep 1: return the FIRST item's price.
//   firstPrice([{ name: "Taco", price: 4.5 }, { name: "Churro", price: 3 }])  →  4.5
function firstPrice(menu) {
  // your code here
}

// Rep 2: write a function called lastName(menu) that returns the LAST item's name.
//   lastName([{ name: "Taco", price: 4.5 }, { name: "Churro", price: 3 }])  →  "Churro"

// Rep 3: write a function called secondLabel(menu) that returns the second item as "Name: $price".
//   secondLabel([{ name: "Taco", price: 4.5 }, { name: "Churro", price: 3 }])  →  "Churro: $3"


// (Leave this last line alone. It tells the checker your file ran.)
const scriptLoaded = true;
