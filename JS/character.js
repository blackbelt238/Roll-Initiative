function Character(name, dexMod, isPlayer) {
  this.name = name;
  this.isPlayer = isPlayer;
  this.dexMod = dexMod;
  this.initiative = 0;

  // define methods
  this.rollInitiative = rollInitiative;
}

function rollInitiative() {
  this.initiative = rollDice(1, 20) + this.dexMod;
}
