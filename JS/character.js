class Character {
  constructor(name, mod, isPlayer) {
    this.isPlayer = isPlayer;
    this.initiative = 0;

    this.setName(name);
    this.setMod(mod);
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
