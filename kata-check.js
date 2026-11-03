// Kata checker. You don't need to change this file.
// Each topic's checks.js uses it to test your script.js and show the results.

const kataList = [];

// A heading for a group of reps.
function drill(title) {
  kataList.push({ heading: title });
}

// One rep: a name, and a test that returns pass(), todo(), almost() or fail().
function rep(label, test) {
  kataList.push({ label: label, test: test });
}

function pass(note) { return { status: "pass", note: note || "" }; }
function todo(note) { return { status: "todo", note: note || "Not started yet." }; }
function almost(note) { return { status: "almost", note: note }; }
function fail(note) { return { status: "fail", note: note }; }

// Shows a value the way you'd type it: "text" in quotes, numbers without.
function show(value) {
  if (typeof value === "string") return '"' + value + '"';
  if (typeof value === "function") return "a function";
  if (value === undefined) return "undefined";
  return JSON.stringify(value);
}

// True if two values hold the same data.
function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// Does this function's code contain some text? Used to check for a for loop, etc.
function codeHas(fn, text) {
  return fn.toString().includes(text);
}

// Calls a function with each case and compares the answer.
// cases looks like: [ [[4.5, 3], 13.5], [[2, 2], 4] ]   (the inputs, then the answer)
function checkCalls(fn, cases) {
  if (typeof fn !== "function") return fail("That isn't a function yet. Write it with the word function.");
  for (let i = 0; i < cases.length; i++) {
    const inputs = cases[i][0];
    const expected = cases[i][1];
    const got = fn.apply(null, inputs);
    const call = fn.name + "(" + inputs.map(show).join(", ") + ")";
    if (got === undefined && i === 0) {
      return todo("It doesn't return anything yet. Did you use console.log instead of return?");
    }
    if (!same(got, expected)) {
      let message = call + " should give " + show(expected) + ", but gave " + show(got) + ".";
      if (typeof got === "string" && typeof expected === "number") message += " That's text. Look for quotes.";
      return fail(message);
    }
  }
  return pass();
}

const icons ={ pass: "✅", todo: "⬜", almost: "🟡", fail: "❌" };

function runKatas() {
  const results = document.getElementById("results");
  const summary = document.getElementById("summary");

  // script.js sets scriptLoaded on its very last line.
  // If it's missing, script.js hit a red error before it got there.
  if (typeof scriptLoaded === "undefined") {
    summary.textContent =
      "⚠️ script.js stopped at a red error. Open the console (right-click → Inspect → Console), " +
      "click the file name and line number, and fix that line.";
    summary.className = "warning";
    return;
  }

  let passed = 0;
  let total = 0;
  let currentList = null;

  kataList.forEach(function (entry) {
    if (entry.heading) {
      const h2 = document.createElement("h2");
      h2.textContent = entry.heading;
      results.appendChild(h2);
      currentList = document.createElement("ul");
      currentList.className = "reps";
      results.appendChild(currentList);
      return;
    }

    let result;
    try {
      result = entry.test();
    } catch (error) {
      if (error instanceof ReferenceError) {
        result = todo("Not found yet: " + error.message + ". Already started? Check the spelling and capitals.");
      } else {
        let message = "Your code crashed: " + error.message + ".";
        if (error.message.includes("of undefined")) {
          message += " In a loop? Use i < list.length, not i <= list.length.";
        }
        result = fail(message);
      }
    }

    total = total + 1;
    if (result.status === "pass") passed = passed + 1;

    const li = document.createElement("li");
    li.className = result.status;
    const title = document.createElement("strong");
    title.textContent = icons[result.status] + " " + entry.label;
    li.appendChild(title);
    if (result.note) {
      const note = document.createElement("span");
      note.textContent = " " + result.note;
      li.appendChild(note);
    }
    currentList.appendChild(li);
  });

  summary.textContent = passed + " of " + total + " reps passed.";
  if (passed === total) summary.textContent += " 🎉 Every rep done! Try start-over.js for another round.";
  console.log("Katas:", passed, "of", total, "reps passed");
}
