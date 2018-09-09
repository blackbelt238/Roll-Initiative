var table = [];
var pageTableBody = document.getElementById("initiative").children[1];

var c1 = new Character("Adran", 4);
table.push(c1);

var c2 = new Character("Jacob", 3);
table.push(c2);

var c3 = new Character("Galanthus Titarius", -1);
table.push(c3);

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

  // add the row to the table body
  pageTableBody.appendChild(newRow);
}

// adds all characters to table#initiative as rows
function populateTable() {
  for (var i = 0; i < table.length; i++) {
    addCharacterToTable(table[i]);
  }
}

// rolls initiative for all characters in table#initiative
function rollForCharacters() {
  // wipe all rows from the table
  while (pageTableBody.firstChild) {
    pageTableBody.removeChild(pageTableBody.firstChild);
  }

  // roll initiative for each character in the table
  for (var i = 0; i < table.length; i++) {
    table[i].rollInitiative();
  }

  populateTable();
}
