// START-OVER COPY. This page doesn't use this file.
// To do the kata again: copy everything below, and paste it over everything in script.js.
// (Make a save point first, so your old work is safe on GitHub.)

// Kata 7: Building the page
// Make elements with JavaScript, put them on the page, and react to clicks.
// Same 3 moves every time: createElement, textContent, appendChild.

// TODO first: change this to YOUR truck's menu. Keep the same shape.
// Drill B shows it on the page as cards.
const myMenu = [
  { name: "Taco", price: 4.5 },
  { name: "Burrito", price: 9 },
  { name: "Churro", price: 3 },
];

// ---------- Drill A: make one element ----------
// Example: make an <h2> that says some text. RETURN it (don't put it on the page here).
function makeHeading(text) {
  const heading = document.createElement("h2");
  heading.textContent = text;
  return heading;
}
console.log("Example:", makeHeading("Today's specials"));   // <h2>Today's specials</h2>

// Rep 1: return an <li> that says the text.
//   makeItem("Taco")  →  <li>Taco</li>
function makeItem(text) {
  // your code here
}

// Rep 2: write a function called makeBadge(text) that returns a <span> that says the text,
// with the Bootstrap classes "badge bg-warning".
//   makeBadge("spicy")  →  <span class="badge bg-warning">spicy</span>

// Rep 3: write a function called makePriceLine(item) that returns a <p> that says the name and price.
//   makePriceLine({ name: "Taco", price: 4.5 })  →  <p>Taco: $4.5</p>


// ---------- Drill B: build a card ----------
// Rep 1: write a function called makeCard(item) that returns a <div> with the classes "card p-3".
// Inside it, appendChild two things, in this order:
//   an <h3> with the name, then a <p> with "$" + the price.
//   makeCard({ name: "Taco", price: 4.5 })  →
//     <div class="card p-3"> <h3>Taco</h3> <p>$4.5</p> </div>


// ---------- Drill C: clear, then show (no leftovers) ----------
// Example: show one message in a box. Clearing first means a second click doesn't stack up.
function showMessage(text, box) {
  box.textContent = "";
  const p = document.createElement("p");
  p.textContent = text;
  box.appendChild(p);
}

// Rep 1: write a function called showSpecials(specials, list).
// Clear the list first. Then use forEach to add one <li> per special.
//   showSpecials(["Taco Tuesday", "Free churro"], list)  →  two <li>s
//   Call it again with the same specials  →  still two <li>s, not four


// ---------- Drill D: clicks ----------
// Example: when the button is clicked, the output says Hello!
function setupHello(button, output) {
  button.addEventListener("click", function () {
    output.textContent = "Hello!";
  });
}

// Rep 1: write a function called setupCounter(button, output).
// Start a count at 0 (inside setupCounter, before addEventListener).
// Each click adds 1 and shows the count in output.
//   click, click, click  →  output says 3

// Rep 2: write a function called setupOrder(button, input, list).
// Each click adds an <li> with what's typed in the input (input.value) to the list,
// then empties the input (input.value = "").
//   type "Taco", click, type "Churro", click  →  two <li>s: Taco, Churro


// (Leave this last line alone. It tells the checker your file ran.)
const scriptLoaded = true;
