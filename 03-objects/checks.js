// Checks for Kata 3. You don't need to change this file.

drill("Drill A: read a property");
rep("Rep 1: getPrice", function () {
  return checkCalls(getPrice, [[[{ name: "Taco", price: 4.5 }], 4.5], [[{ name: "Pho", price: 12 }], 12]]);
});
rep("Rep 2: isSpicy", function () {
  return checkCalls(isSpicy, [[[{ name: "Salsa", spicy: true }], true], [[{ name: "Rice", spicy: false }], false]]);
});
rep("Rep 3: getCity", function () {
  return checkCalls(getCity, [[[{ name: "Taco Rocket", city: "Austin" }], "Austin"], [[{ name: "Pho Real", city: "Tulsa" }], "Tulsa"]]);
});

drill("Drill B: make an object");
rep("Rep 1: myItem", function () {
  myItem; // not made yet? This line shows "not started".
  if (typeof myItem !== "object" || myItem === null) return fail("myItem should be an object, in { curly braces }.");
  if (typeof myItem.name !== "string") return fail("myItem needs a name, in quotes. Right now name is " + show(myItem.name) + ".");
  if (typeof myItem.price !== "number") return fail("myItem needs a price as a number, no quotes. Right now price is " + show(myItem.price) + ".");
  return pass("It's " + show(myItem) + ".");
});
rep("Rep 2: makeItem", function () {
  return checkCalls(makeItem, [[["Pho", 12], { name: "Pho", price: 12 }], [["Taco", 4.5], { name: "Taco", price: 4.5 }]]);
});
rep("Rep 3: makeTruck", function () {
  return checkCalls(makeTruck, [[["Taco Rocket", "Austin"], { name: "Taco Rocket", city: "Austin" }], [["Pho Real", "Tulsa"], { name: "Pho Real", city: "Tulsa" }]]);
});

// Checks a method two ways: on the student's object, and on a test object.
// The test object proves the method uses this instead of a typed-in value.
function checkMethod(obj, objName, methodName, testObj, expectedFor) {
  if (typeof obj !== "object" || obj === null) return fail(objName + " should be an object, in { curly braces }.");
  if (typeof obj[methodName] !== "function") return fail(objName + " needs a method called " + methodName + ". Check the spelling.");
  const got = obj[methodName]();
  if (got === undefined) return todo(methodName + "() doesn't return anything yet. Add return.");
  if (got !== expectedFor(obj)) {
    let message = objName + "." + methodName + "() gave " + show(got) + ". It should be " + show(expectedFor(obj)) + ".";
    if (typeof got === "string" && (got.includes("undefined") || got.includes("Welcome to !"))) {
      message += " Is it an arrow function? Arrows don't get their own this. Use function () { }.";
    }
    return fail(message);
  }
  const testGot = obj[methodName].call(testObj);
  if (testGot !== expectedFor(testObj)) {
    return almost("Right answer! But it only works for this one object. Use this instead of typing the value in.");
  }
  return pass(objName + "." + methodName + "() says " + show(got) + ".");
}

drill("Drill C: a method that uses this");
rep("Rep 1: myTruck.describe()", function () {
  return checkMethod(myTruck, "myTruck", "describe", { name: "Test Truck" }, function (o) {
    return "Welcome to " + o.name + "!";
  });
});
rep("Rep 2: myCart.summary()", function () {
  return checkMethod(myCart, "myCart", "summary", { count: 8 }, function (o) {
    return "You have " + o.count + " items";
  });
});

runKatas();
