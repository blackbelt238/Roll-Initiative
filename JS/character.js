class Character {
  constructor(name, mod, isPlayer) {
    this.name = name;
    this.isPlayer = isPlayer;
    this.mod = mod;
    this.initiative = 0;
  }

  setMod(mod) {
    mod = parseInt(stripTags(mod).replace("+", ""), 10);
    if (!isNaN(mod)) {
      this.mod = mod;
    }
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
