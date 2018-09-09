var table = []

var c1 = new Character("Adran", 4);
table.push(c1);

var c2 = new Character("Jacob", 3);
table.push(c2);

var c3 = new Character("Galanthus Titarius", -1);
table.push(c3);

// given a Character object, add it to table#initiative
function addCharacterToTable(character) {
  pageTableBody = document.getElementById("initiative").children[1];
  var newRow = document.createElement('tr');

  // create the initiative column
  var initCol = document.createElement('td');
  initCol.appendChild(document.createTextNode(0)); // start the character's initiative at 0
  newRow.appendChild(initCol);

  // create the name column
  var nameCol = document.createElement('td');
  nameCol.appendChild(document.createTextNode(character.name));
  newRow.appendChild(nameCol);

  // create the dexterity modifier column
  var dexModCol = document.createElement('td');
  dexModCol.appendChild(document.createTextNode(character.dexMod));
  newRow.appendChild(dexModCol);

  // add the row to the table body
  pageTableBody.appendChild(newRow);
}

function populateTable() {
  for (var i = 0; i < table.length; i++) {
    addCharacterToTable(table[i]);
  }
}
