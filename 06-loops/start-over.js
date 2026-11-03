// START-OVER COPY. This page doesn't use this file.
// To do the kata again: copy everything below, and paste it over everything in script.js.
// (Make a save point first, so your old work is safe on GitHub.)

// Kata 6: Loops
// A loop runs the same code once for every item in a list.
// Friday's assignment needs a for loop total AND a forEach list, so practice both here.

// TODO first: change this to YOUR truck's menu. Keep the same shape.
// Drill B shows it on the page.
const myMenu = [
  { name: "Taco", price: 4.5 },
  { name: "Burrito", price: 9 },
  { name: "Nachos", price: 6.25 },
  { name: "Churro", price: 3 },
];

// ---------- Drill A: a for loop that adds up ----------
// Example: count the items. count starts BEFORE the loop and grows INSIDE it.
function countItems(menu) {
  let count = 0;
  for (let i = 0; i < menu.length; i++) {
    count = count + 1;
  }
  return count;
}
console.log("Example:", countItems(myMenu));   // 4

// Rep 1: use a for loop to add up every price. Return the total.
//   menuTotal(myMenu)  →  22.75 (for the Taco Rocket menu)
function menuTotal(menu) {
  // your code here
}

// Rep 2: write a function called totalQuantity(orders) that adds up every order's quantity, with a for loop.
//   totalQuantity([{ item: "Taco", quantity: 2 }, { item: "Pho", quantity: 5 }])  →  7

// Rep 3: write a function called countCheap(menu) that counts the items under $5, with a for loop and an if.
//   countCheap(myMenu)  →  2 (for the Taco Rocket menu)


// ---------- Drill B: forEach onto the page ----------
// Example: log every name.
function logNames(menu) {
  menu.forEach(function (item) {
    console.log("Example:", item.name);
  });
}
logNames(myMenu);

// Rep 1: use forEach to put every item on the page.
// For each item: make an <li>, set its textContent to item.name + ": $" + item.price,
// and append it to list.
function showMenu(menu, list) {
  // your code here
}

// Rep 2: write a function called showTags(tags, list) that does the same for a list of words.
//   showTags(["vegan", "spicy"], list)  →  two <li>s: vegan, spicy


// (Leave this last line alone. It tells the checker your file ran.)
const scriptLoaded = true;
