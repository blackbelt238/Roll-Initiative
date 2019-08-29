class Character {
  constructor(name, mod, isPlayer) {
    this.isPlayer = isPlayer;

    this.setName(name);
    this.setMod(mod);

    // initiative is immediately rolled upon character creation
    this.rollInitiative();
  }

  setMod(mod) {
    mod = parseInt(mod, 10);
    if (isNaN(mod)) {
      this.mod = 0;
      return;
    }
    this.mod = mod;
  }

  setName(name) {
    this.name = stripTags(name);
  }

  rollInitiative() {
    this.initiative = rollDice(1, 20) + this.mod;
  }
}

function stripTags(str) {
  return str.replace(/<\s*[^>]*>|<\s*\/\s*>/g,"");
}
