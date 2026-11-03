// START-OVER COPY. This page doesn't use this file.
// To do the kata again: copy everything below, and paste it over everything in script.js.
// (Make a save point first, so your old work is safe on GitHub.)

// Kata 2: Functions
// Each drill has an Example (already done) and Reps for you to do.
// Rep 1 gives you the empty function. For Reps 2 and 3, you write the whole thing.
// Remember: return hands the answer back. console.log only prints it.

// ---------- Drill A: return a calculation ----------
// Example:
function addTip(price, tip) {
  return price + tip;
}
console.log("Example:", addTip(10, 2));   // 12

// Rep 1: return price times quantity.   orderTotal(4.5, 3)  →  13.5
function orderTotal(price, quantity) {
  // your code here
}

// Rep 2: write a function called withDelivery(total) that returns the total plus 3.
//   withDelivery(10)  →  13

// Rep 3: write a function called splitBill(total, people) that returns the total divided by people.
//   splitBill(20, 4)  →  5


// ---------- Drill B: return text ----------
// Example:
function greet(name) {
  return "Hi, " + name + "!";
}
console.log("Example:", greet("Sam"));   // Hi, Sam!

// Rep 1: return the name, a colon, a space, a dollar sign and the price.
//   itemLabel("Taco", 4.5)  →  "Taco: $4.5"
function itemLabel(name, price) {
  // your code here
}

// Rep 2: write a function called orderReady(name).
//   orderReady("Sam")  →  "Sam, your order is ready!"

// Rep 3: write a function called ticket(number).
//   ticket(7)  →  "Order #7"


// ---------- Drill C: return true or false ----------
// Example: open until 9 PM (hour 21).
function isOpen(hour) {
  return hour < 21;
}
console.log("Example:", isOpen(18));   // true

// Rep 1: return true if the price is less than 5.   isCheap(3)  →  true
function isCheap(price) {
  // your code here
}

// Rep 2: write a function called isBigOrder(quantity) that returns true for 10 or more.
//   isBigOrder(10)  →  true      isBigOrder(2)  →  false

// Rep 3: write a function called isSoldOut(left) that returns true when left is 0.
//   isSoldOut(0)  →  true      isSoldOut(5)  →  false


// (Leave this last line alone. It tells the checker your file ran.)
const scriptLoaded = true;
