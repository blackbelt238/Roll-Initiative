function rollDie(sides) {
  return ((sides - 1) * Math.random() + 1) | 0;
}

function rollDice(number, sides) {
  sum = 0;
  for (i = 0; i < number; i++) {
    sum += rollDie(sides);
  }
  return sum;
}
