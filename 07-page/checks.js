// Checks for Kata 7. You don't need to change this file.

// Is it an element with this tag? Gives a hint if not.
function checkElement(made, tag, text) {
  if (made === undefined) return todo("It doesn't return anything yet. Add return at the end.");
  if (!(made instanceof HTMLElement)) {
    return fail("It returned " + show(made) + ", not an element. Make one with document.createElement(\"" + tag + "\").");
  }
  if (made.tagName.toLowerCase() !== tag) {
    return fail("It made a <" + made.tagName.toLowerCase() + ">. It should make a <" + tag + ">.");
  }
  if (made.textContent !== text) {
    return fail("It says " + show(made.textContent) + ". It should say " + show(text) + ".");
  }
  return pass();
}

// Did they use innerHTML? Works, but not our house rule.
function houseRule(fn, result) {
  if (result.status === "pass" && codeHas(fn, "innerHTML")) {
    return almost("It works, but use textContent, not innerHTML. That's our house rule.");
  }
  return result;
}

drill("Drill A: make one element");
rep("Rep 1: makeItem", function () {
  let result = checkElement(makeItem("Taco"), "li", "Taco");
  if (result.status === "pass") result = checkElement(makeItem("Pho"), "li", "Pho");
  return houseRule(makeItem, result);
});
rep("Rep 2: makeBadge", function () {
  const badge = makeBadge("spicy");
  const result = checkElement(badge, "span", "spicy");
  if (result.status !== "pass") return result;
  if (!badge.classList.contains("badge") || !badge.classList.contains("bg-warning")) {
    return fail("The classes are " + show(badge.className) + ". Set badge.className = \"badge bg-warning\".");
  }
  return houseRule(makeBadge, pass());
});
rep("Rep 3: makePriceLine", function () {
  let result = checkElement(makePriceLine({ name: "Taco", price: 4.5 }), "p", "Taco: $4.5");
  if (result.status === "pass") result = checkElement(makePriceLine({ name: "Pho", price: 12 }), "p", "Pho: $12");
  return houseRule(makePriceLine, result);
});

drill("Drill B: build a card");
rep("Rep 1: makeCard", function () {
  const card = makeCard({ name: "Taco", price: 4.5 });
  if (card === undefined) return todo("It doesn't return anything yet. Add return card; at the end.");
  if (!(card instanceof HTMLElement) || card.tagName !== "DIV") return fail("It should return a <div>. Start with document.createElement(\"div\").");
  if (!card.classList.contains("card") || !card.classList.contains("p-3")) {
    return fail("The div's classes are " + show(card.className) + ". Set card.className = \"card p-3\".");
  }
  if (card.children.length !== 2) {
    return fail("Inside the card: " + card.children.length + ". It should have 2: an <h3> and a <p>. Did you appendChild both?");
  }
  const h3 = card.children[0];
  const p = card.children[1];
  if (h3.tagName !== "H3" || h3.textContent !== "Taco") return fail("The first thing inside should be <h3>Taco</h3>.");
  if (p.tagName !== "P" || p.textContent !== "$4.5") return fail("The second thing inside should be <p>$4.5</p>. It says " + show(p.textContent) + ".");
  return houseRule(makeCard, pass());
});

drill("Drill C: clear, then show");
rep("Rep 1: showSpecials", function () {
  const list = document.createElement("ul");
  const specials = ["Taco Tuesday", "Free churro"];
  showSpecials(specials, list);
  if (list.children.length === 0) return todo("No <li>s yet. createElement(\"li\"), set textContent, appendChild to list.");
  if (list.children.length !== 2) return fail("It made " + list.children.length + " <li>s for 2 specials. It should make one each.");
  if (list.children[0].textContent !== "Taco Tuesday") return fail("The first <li> says " + show(list.children[0].textContent) + ". It should say \"Taco Tuesday\".");
  showSpecials(specials, list);
  if (list.children.length !== 2) {
    return fail("The second time, the list had " + list.children.length + " <li>s. Leftovers! Start with list.textContent = \"\";");
  }
  if (!codeHas(showSpecials, "forEach")) return almost("It works! Now write it with forEach.");
  return houseRule(showSpecials, pass());
});

drill("Drill D: clicks");
rep("Rep 1: setupCounter", function () {
  const button = document.createElement("button");
  const output = document.createElement("p");
  setupCounter(button, output);
  button.click();
  if (output.textContent === "") return todo("Nothing shows after a click yet. Did you use addEventListener(\"click\", ...)?");
  button.click();
  button.click();
  if (output.textContent === "1") return fail("It says 1 after 3 clicks. Is let count = 0; inside the click function? Move it above addEventListener.");
  if (output.textContent !== "3") return fail("After 3 clicks it says " + show(output.textContent) + ". It should say \"3\".");
  return pass();
});
rep("Rep 2: setupOrder", function () {
  const button = document.createElement("button");
  const input = document.createElement("input");
  const list = document.createElement("ul");
  setupOrder(button, input, list);
  input.value = "Taco";
  button.click();
  if (list.children.length === 0) return todo("No <li> after a click yet. Did you use addEventListener(\"click\", ...)?");
  if (list.children[0].textContent !== "Taco") return fail("The <li> says " + show(list.children[0].textContent) + ". It should say what was typed: input.value.");
  if (input.value !== "") return almost("The order shows! Now empty the box after: input.value = \"\";");
  input.value = "Churro";
  button.click();
  if (list.children.length !== 2) return fail("After 2 orders the list has " + list.children.length + " <li>s. It should have 2. Don't clear the list here.");
  return houseRule(setupOrder, pass());
});

runKatas();

// Your own menu, on the page (once makeCard works).
try {
  const area = document.getElementById("my-menu");
  myMenu.forEach(function (item) {
    area.appendChild(makeCard(item));
  });
} catch (error) {
  // makeCard isn't ready yet. That's fine.
}

// Try your click functions for real (once they work).
try { setupCounter(document.getElementById("count-btn"), document.getElementById("count-out")); } catch (error) {}
try { setupOrder(document.getElementById("order-btn"), document.getElementById("order-in"), document.getElementById("order-list")); } catch (error) {}
