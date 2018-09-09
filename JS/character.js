function Character(name, dexMod) {
  this.name = name;
  this.dexMod = dexMod;

  // define methods
  this.rollInitiative = rollInitiative;
}

function rollInitiative() {
  return rollDice(1, 20) + this.dexMod;
}
