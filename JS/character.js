function Character(name, mod, isPlayer) {
  this.name = name;
  this.isPlayer = isPlayer;
  this.mod = mod;
  this.initiative = 0;

  // define methods
  this.rollInitiative = rollInitiative;
}

function rollInitiative() {
  this.initiative = rollDice(1, 20) + this.mod;
}
