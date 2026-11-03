// START-OVER COPY. This page doesn't use this file.
// To do the kata again: copy everything below, and paste it over everything in script.js.
// (Make a save point first, so your old work is safe on GitHub.)

// Kata 3: Objects
// An object is one thing with details. Each detail is a property: name: value
// Each drill has an Example (already done) and Reps for you to do.

// ---------- Drill A: read a property ----------
// Example:
function getName(item) {
  return item.name;
}
console.log("Example:", getName({ name: "Taco", price: 4.5 }));   // Taco

// Rep 1: return the item's price.   getPrice({ name: "Taco", price: 4.5 })  →  4.5
function getPrice(item) {
  // your code here
}

// Rep 2: write a function called isSpicy(item) that returns the item's spicy property.
//   isSpicy({ name: "Salsa", spicy: true })  →  true

// Rep 3: write a function called getCity(truck) that returns the truck's city.
//   getCity({ name: "Taco Rocket", city: "Austin" })  →  "Austin"


// ---------- Drill B: make an object ----------
// Example:
const exampleItem = { name: "Taco", price: 4.5 };

// Rep 1: make a const called myItem: one of YOUR menu items, with a name (text) and a price (number).

// Rep 2: return a new object with these two properties.
//   makeItem("Pho", 12)  →  { name: "Pho", price: 12 }
function makeItem(name, price) {
  // your code here
}

// Rep 3: write a function called makeTruck(name, city) that returns { name: ..., city: ... }.
//   makeTruck("Taco Rocket", "Austin")  →  { name: "Taco Rocket", city: "Austin" }


// ---------- Drill C: a method that uses this ----------
// A method is a function inside an object. Inside it, this means "the object before the dot".
// Example:
const exampleTruck = {
  name: "Taco Rocket",
  describe: function () {
    return "Welcome to " + this.name + "!";
  },
};
console.log("Example:", exampleTruck.describe());   // Welcome to Taco Rocket!

// Rep 1: make a const called myTruck with YOUR truck's name and a describe() method.
// describe() returns "Welcome to " + this.name + "!"

// Rep 2: make a const called myCart with count: 3 and a summary() method.
// summary() returns "You have 3 items". Use this.count, not the number 3.


// (Leave this last line alone. It tells the checker your file ran.)
const scriptLoaded = true;
