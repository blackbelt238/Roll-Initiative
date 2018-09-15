class Table {
  constructor() {
    this.table = [];
  }

  addCharacter(character) {
    this.table.push(character);
  }

  getCharacter(index) {
    return this.table[index];
  }

  removeCharacter(index) {
    this.table.splice(index, 1);
  }

  // remove all non-player characters from the table
  removeNPCs() {
    for (var i = this.table.length-1; i >= 0; i--) {
      if (!this.table[i].isPlayer) {
        this.removeCharacter(i);
      }
    }
  }

  // rolls initiative for all characters in table#initiative
  rollForCharacters() {
    // roll initiative for each character in the table
    for (var i = 0; i < this.table.length; i++) {
      this.table[i].rollInitiative();
    }

    // order the characters from heighest initiative score to lowest
    this.table.sort(function(c1, c2) {
      // utilize randomness to break ties
      if (c1.initiative === c2.initiative) {
        return (rollDice(1, 2) === 2 ? -1 : 1);
      }
      return c2.initiative - c1.initiative;
    });
  }

  size() {
    return this.table.length;
  }
}
