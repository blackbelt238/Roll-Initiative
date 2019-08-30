class Character {
  constructor(name, mod, isPlayer, isAction = false, initiative = 0) {
    this.isPlayer = isPlayer;
    this.isAction = isAction;

    this.setName(name);
    this.setMod(mod);

    // initiative is immediately rolled upon character creation
    this.initiative = initiative;
    this.rollInitiative();
  }

  setIsAction(isAction) {
    this.isAction = true;
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

  // rolls this character's initiative unless it is an action
  rollInitiative() {
    if (this.isAction) return;
    this.initiative = rollDice(1, 20) + this.mod;
  }
}

function stripTags(str) {
  return str.replace(/<\s*[^>]*>|<\s*\/\s*>/g,"");
}
