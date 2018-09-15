class Character {
  constructor(name, mod, isPlayer) {
    this.name = name;
    this.isPlayer = isPlayer;
    this.mod = mod;
    this.initiative = 0;
  }

  rollInitiative() {
    this.initiative = rollDice(1, 20) + this.mod;
  }
}
