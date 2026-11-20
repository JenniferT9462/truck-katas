// Checks for Kata 8. You don't need to change this file.

const otherRecipe = {
  id: 2,
  name: "Vegetarian Stir-Fry",
  cuisine: "Asian",
  prepTimeMinutes: 15,
  cookTimeMinutes: 20,
  ingredients: ["Tofu", "Broccoli", "Soy sauce"],
};

drill("Drill A: look before you use it");
rep("Rep 1: recipeLine", function () {
  return checkCalls(recipeLine, [[[sampleRecipe], "Classic Margherita Pizza (Italian)"], [[otherRecipe], "Vegetarian Stir-Fry (Asian)"]]);
});
rep("Rep 2: totalTime", function () {
  const result = checkCalls(totalTime, [[[sampleRecipe], 35], [[otherRecipe], 35]]);
  if (result.status === "fail" && totalTime(sampleRecipe) === "2015") return fail("It gave \"2015\". Those are numbers already, so don't put them in quotes or a template.");
  return result;
});
rep("Rep 3: firstIngredient", function () {
  const result = checkCalls(firstIngredient, [[[sampleRecipe], "Pizza dough"], [[otherRecipe], "Tofu"]]);
  if (result.status === "fail" && firstIngredient(sampleRecipe) === "Tomato sauce") return fail("That's the second one. Lists start counting at 0.");
  return result;
});

drill("Drill B: status codes");
rep("Rep 1: isOk", function () {
  return checkCalls(isOk, [[[200], true], [[201], true], [[299], true], [[404], false], [[500], false], [[199], false], [[300], false]]);
});
rep("Rep 2: statusMessage", function () {
  return checkCalls(statusMessage, [[[200], "Found it"], [[201], "Made it"], [[404], "Not found"], [[500], "Something went wrong"], [[400], "Something went wrong"]]);
});

// Right answer without backticks and ${ }? It's "almost".
function needsTemplate(fn, result) {
  if (result.status === "pass" && !(codeHas(fn, "`") && codeHas(fn, "${"))) {
    return almost("Right answer! Now write it with a template literal: backticks ` ` and ${ }.");
  }
  return result;
}

drill("Drill C: template literals");
rep("Rep 1: priceTag", function () {
  const result = checkCalls(priceTag, [[[{ name: "Taco", price: 4.5 }], "Taco: $4.5"], [[{ name: "Pho", price: 12 }], "Pho: $12"]]);
  if (result.status === "fail" && priceTag({ name: "Taco", price: 4.5 }) === "Taco: 4.5") {
    return fail("The $ is missing. One $ for the dollar sign, then ${ } for the price: $${item.price}");
  }
  if (result.status === "fail" && String(priceTag({ name: "Taco", price: 4.5 })).includes("${")) {
    return fail("It shows ${ } as plain text. Use backticks ` ` around the text, not quotes.");
  }
  return needsTemplate(priceTag, result);
});
rep("Rep 2: recipeCard", function () {
  const result = checkCalls(recipeCard, [[[sampleRecipe], "Classic Margherita Pizza · Italian · 35 min"], [[otherRecipe], "Vegetarian Stir-Fry · Asian · 35 min"]]);
  if (result.status === "fail" && recipeCard(sampleRecipe) === "Classic Margherita Pizza · Italian · 2015 min") {
    return fail("It says 2015 min. Do the math inside ONE ${ }: ${recipe.prepTimeMinutes + recipe.cookTimeMinutes}");
  }
  return needsTemplate(recipeCard, result);
});
rep("Rep 3: addedMessage", function () {
  return needsTemplate(addedMessage, checkCalls(addedMessage, [[["Pho Rocket", 51], 'Added "Pho Rocket" as recipe #51'], [["Taco", 52], 'Added "Taco" as recipe #52']]));
});

drill("Drill D: build the request");
rep("Rep 1: recipeUrl", function () {
  return needsTemplate(recipeUrl, checkCalls(recipeUrl, [[[7], "https://dummyjson.com/recipes/7"], [[30], "https://dummyjson.com/recipes/30"]]));
});
rep("Rep 2: postOptions", function () {
  const options = postOptions("Pho Rocket");
  if (options === undefined) return todo("It doesn't return anything yet. Return an object { ... }.");
  if (options.method !== "POST") return fail("method is " + show(options.method) + ". It should be \"POST\" (capitals).");
  if (!options.headers || options.headers["Content-Type"] !== "application/json") {
    return fail("Add headers: { \"Content-Type\": \"application/json\" }. Check the spelling and the capital C and T.");
  }
  if (typeof options.body !== "string") return fail("The body is still an object. Turn it into text: JSON.stringify({ name: name }).");
  if (options.body !== JSON.stringify({ name: "Pho Rocket" })) return fail("The body is " + show(options.body) + ". It should be " + show(JSON.stringify({ name: "Pho Rocket" })) + ".");
  return pass();
});

// ---------- The pretend server ----------
// Swaps the real fetch for a fake one while a check runs, then puts the real one back.
async function withPretendServer(offline, test) {
  const realFetch = window.fetch;
  const calls = [];
  window.fetch = async function (url, options) {
    calls.push({ url: String(url), options: options || {} });
    if (offline) throw new TypeError("Failed to fetch");
    return pretendAnswer(String(url), options || {});
  };
  try {
    return await test(calls);
  } finally {
    window.fetch = realFetch;
  }
}

function pretendResponse(status, data) {
  return { ok: status >= 200 && status <= 299, status: status, json: async function () { return data; } };
}

function pretendAnswer(url, options) {
  const base = "https://dummyjson.com/recipes/";
  if (url === base + "add") {
    if (options.method !== "POST") return pretendResponse(404, { message: "Recipe with id 'add' not found" });
    if (typeof options.body !== "string") return pretendResponse(400, { message: "\"[object Object]\" is not valid JSON" });
    const sent = JSON.parse(options.body);
    return pretendResponse(201, Object.assign({ id: 51 }, sent));
  }
  const id = Number(url.replace(base, ""));
  if (id >= 1 && id <= 50) {
    if (id === 1) return pretendResponse(200, sampleRecipe);
    return pretendResponse(200, { id: id, name: "Test Dish " + id, cuisine: "Cuisine " + id });
  }
  return pretendResponse(404, { message: "Recipe with id '" + id + "' not found" });
}

// Turns common async mistakes into hints.
function fetchHint(error) {
  if (error.message.includes("json is not a function")) return fail("response.json is not a function. Is there an await before fetch(...)?");
  if (error.message.includes("Failed to fetch")) return fail("It crashed with no internet. Wrap it in try { ... } catch (error) { return \"Offline\"; }");
  throw error;
}

drill("Drill E: fetch for real (pretend server)");
rep("Rep 1: getCuisine", async function () {
  if (typeof getCuisine !== "function") return todo("Not found yet: getCuisine. Already started? Check the spelling and capitals.");
  return withPretendServer(false, async function (calls) {
    let got;
    try { got = await getCuisine(1); } catch (error) { return fetchHint(error); }
    if (calls.length === 0) return todo("It doesn't call fetch yet.");
    if (calls[0].url !== "https://dummyjson.com/recipes/1") return fail("It asked for " + show(calls[0].url) + ". It should ask for \"https://dummyjson.com/recipes/1\".");
    if (got === undefined) return fail("It gave undefined. Is there an await before response.json()? And a return at the end?");
    if (got !== "Italian") return fail("getCuisine(1) gave " + show(got) + ". It should give \"Italian\".");
    const other = await getCuisine(7);
    if (other !== "Cuisine 7") return fail("getCuisine(7) gave " + show(other) + ". Use the id in the URL.");
    return pass();
  });
});
rep("Rep 2: safeCuisine", async function () {
  if (typeof safeCuisine !== "function") return todo("Not found yet: safeCuisine. Already started? Check the spelling and capitals.");
  const good = await withPretendServer(false, async function () {
    try { return await safeCuisine(1); } catch (error) { return error; }
  });
  if (good instanceof Error) return fetchHint(good);
  if (good !== "Italian") return fail("safeCuisine(1) gave " + show(good) + ". It should still give \"Italian\".");
  const missing = await withPretendServer(false, async function () {
    try { return await safeCuisine(9999); } catch (error) { return error; }
  });
  if (missing instanceof Error) return fetchHint(missing);
  if (missing !== "Not found") return fail("safeCuisine(9999) gave " + show(missing) + ". Check if (!response.ok) and return \"Not found\".");
  const offline = await withPretendServer(true, async function () {
    try { return await safeCuisine(1); } catch (error) { return error; }
  });
  if (offline instanceof Error) return fetchHint(offline);
  if (offline !== "Offline") return fail("With no internet it gave " + show(offline) + ". In catch, return \"Offline\".");
  return pass("Both bad days handled!");
});
rep("Rep 3: sendDish", async function () {
  if (typeof sendDish !== "function") return todo("Not found yet: sendDish. Already started? Check the spelling and capitals.");
  return withPretendServer(false, async function (calls) {
    let got;
    try { got = await sendDish("Pho Rocket"); } catch (error) { return fetchHint(error); }
    if (calls.length === 0) return todo("It doesn't call fetch yet.");
    const sent = calls[0];
    if (sent.url !== "https://dummyjson.com/recipes/add") return fail("It sent to " + show(sent.url) + ". It should send to \"https://dummyjson.com/recipes/add\".");
    if (sent.options.method !== "POST") return fail("It sent a GET. Add the options: fetch(url, { method: \"POST\", ... }).");
    if (!sent.options.headers || sent.options.headers["Content-Type"] !== "application/json") return fail("Add headers: { \"Content-Type\": \"application/json\" }.");
    if (typeof sent.options.body !== "string") return fail("The server got [object Object]. Wrap the body in JSON.stringify(...).");
    if (got === undefined) return fail("It gave undefined. Is there an await before response.json()? And a return?");
    const expected = 'Added "Pho Rocket" as recipe #51';
    if (got !== expected) return fail("It gave " + show(got) + ". It should give " + show(expected) + ".");
    return pass("Payload went out as JSON. 201 Created!");
  });
});

runKatas();
