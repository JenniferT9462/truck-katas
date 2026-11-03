// Checks for Kata 2. You don't need to change this file.

drill("Drill A: return a calculation");
rep("Rep 1: orderTotal", function () {
  return checkCalls(orderTotal, [[[4.5, 3], 13.5], [[2, 5], 10]]);
});
rep("Rep 2: withDelivery", function () {
  return checkCalls(withDelivery, [[[10], 13], [[0], 3]]);
});
rep("Rep 3: splitBill", function () {
  return checkCalls(splitBill, [[[20, 4], 5], [[9, 3], 3]]);
});

drill("Drill B: return text");
rep("Rep 1: itemLabel", function () {
  return checkCalls(itemLabel, [[["Taco", 4.5], "Taco: $4.5"], [["Pho", 12], "Pho: $12"]]);
});
rep("Rep 2: orderReady", function () {
  return checkCalls(orderReady, [[["Sam"], "Sam, your order is ready!"], [["Ana"], "Ana, your order is ready!"]]);
});
rep("Rep 3: ticket", function () {
  return checkCalls(ticket, [[[7], "Order #7"], [[42], "Order #42"]]);
});

drill("Drill C: return true or false");
rep("Rep 1: isCheap", function () {
  return checkCalls(isCheap, [[[3], true], [[9], false], [[5], false]]);
});
rep("Rep 2: isBigOrder", function () {
  return checkCalls(isBigOrder, [[[10], true], [[2], false], [[25], true]]);
});
rep("Rep 3: isSoldOut", function () {
  return checkCalls(isSoldOut, [[[0], true], [[5], false]]);
});

runKatas();
