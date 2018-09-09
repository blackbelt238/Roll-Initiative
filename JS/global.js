var table = [];
var pageTableBody = document.getElementById("initiative").children[1];

var c1 = new Character("Raja the Red", 4, true);
table.push(c1);

var c2 = new Character("Tryst", 3, true);
table.push(c2);

var c3 = new Character("Galanthus Titarius", -1, false);
table.push(c3);

var c4 = new Character("Crakule", 2, true);
table.push(c4);

var c5 = new Character("Solomon", 6, false);
table.push(c5);

// given a Character object, add it to table#initiative
function addCharacterToTable(character) {
  var newRow = document.createElement("tr");

  // create the initiative column
  var initCol = document.createElement("td");
  initCol.appendChild(document.createTextNode(character.initiative)); // start the character's initiative at 0
  newRow.appendChild(initCol);

  // create the name column
  var nameCol = document.createElement("td");
  nameCol.appendChild(document.createTextNode(character.name));
  newRow.appendChild(nameCol);

  // create the dexterity modifier column
  var dexModCol = document.createElement("td");
  dexModCol.appendChild(document.createTextNode(character.dexMod));
  newRow.appendChild(dexModCol);

  var rowActions = document.createElement("td");
  // create the trash icon for deleting a row
  var trashIcon = document.createElement("i");
  trashIcon.classList.add("fas");
  trashIcon.classList.add("fa-trash-alt");
  rowActions.appendChild(trashIcon);
  newRow.appendChild(rowActions);
  trashIcon.onclick = function() { removeRow(this.parentNode.parentNode); };

  // add the row to the table body
  pageTableBody.appendChild(newRow);
}

// wipe all rows from the table
function clearTable() {
  while (pageTableBody.firstChild) {
    pageTableBody.removeChild(pageTableBody.firstChild);
  }
}

// adds all characters to table#initiative as rows
function populateTable() {
  clearTable();
  for (var i = 0; i < table.length; i++) {
    addCharacterToTable(table[i]);
  }
}

// remove the Character at the given index in the table
function removeCharacter(index) {
  table.splice(index, 1);
}

// given a DOM table row to remove, delete it and its Character
function removeRow(tr) {
  removeCharacter(tr.rowindex-1);
  populateTable();
}

// remove all non-player characters from the table
function removeNPCs() {
  for (var i = 0; i < table.length; i++) {
    if (!table[i].isPlayer) {
      removeCharacter(i);
    }
  }

  populateTable();
}

// rolls initiative for all characters in table#initiative
function rollForCharacters() {
  // roll initiative for each character in the table
  for (var i = 0; i < table.length; i++) {
    table[i].rollInitiative();
  }

  // order the characters from heighest initiative score to lowest
  table.sort(function(c1, c2) {
    // utilize randomness to break ties
    if (c1.initiative === c2.initiative) {
      return (rollDice(1, 2) === 2 ? -1 : 1);
    }
    return c2.initiative - c1.initiative;
  });

  populateTable();
}
