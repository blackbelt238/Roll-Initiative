function rollDie(sides) {
  return (sides * Math.random() + 1) | 0;
}

function rollDice(number, sides) {
  var sum = 0;
  for (var i = 0; i < number; i++) {
    sum += rollDie(sides);
  }
  return sum;
}
