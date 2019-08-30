var table = new Table();
var pageTableBody = document.getElementById("initiative").children[1];

// given a Character object, add it to table#initiative
function addCharacterToPage(character) {
  var newRow = document.createElement("tr");

  // create the initiative column
  var initCol = document.createElement("td");
  initCol.appendChild(document.createTextNode(character.initiative)); // start the character's initiative at 0
  newRow.appendChild(initCol);

  // create the name column
  var nameCol = document.createElement("td");
  nameCol.appendChild(document.createTextNode(character.name));
  nameCol.contentEditable = true;
  nameCol.spellcheck = false;
  nameCol.focusout = function() { saveName(this); };
  newRow.appendChild(nameCol);

  // create the dexterity modifier column
  var modCol = document.createElement("td");
  modCol.appendChild(document.createTextNode(character.mod));
  modCol.onclick = function() { editModifierOnPage(this); };
  newRow.appendChild(modCol);

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
function clearTableOnPage() {
  while (pageTableBody.firstChild) {
    pageTableBody.removeChild(pageTableBody.firstChild);
  }
}

// create a new character from data in the modal
function createCharacterFromModal() {
  var mName = document.getElementById("characterNameInput").value;
  var mInitMod = parseInt(document.getElementById("characterNumberInput").value, 10);
  var mIsPlayer = $("#characterIsPlayerInput").hasClass("active");

  return new Character(mName, mInitMod, mIsPlayer);
}

// resets all data from modal content
function resetModal() {
  Array.from(document.getElementsByClassName("nameInput"))
       .forEach(input => input.value = "");
  document.getElementById("characterNumberInput").value = 0;
  document.getElementById("actionNumberInput").value = 20;
  document.getElementById("characterIsPlayerInput").classList.remove("active");
}

// adds all characters to table#initiative as rows
function populatePage() {
  clearTableOnPage();
  for (var i = 0; i < table.size(); i++) {
    addCharacterToPage(table.getCharacter(i));
  }
}

function addFromModal() {
  var activePillTitle =
    Array.from(document.getElementsByClassName("nav-link"))
         .find(pill => pill.classList.contains("active"))
         .innerText;

  if (activePillTitle.toLowerCase() === "character") {
    addCharacterFromModal();
  } else if (activePillTitle.toLowerCase() === "action") {
    console.warn("TODO: create addActionFromModal function");
  } else {
    console.error("Invalid modal pill title: " + activePillTitle);
  }

  // rebuild the table before hiding the modal
  populatePage();
  $("#addEntryModal").modal("hide");
}

// using input from the modal, add a new character to the table
function addCharacterFromModal() {
  var character = createCharacterFromModal();
  table.addCharacter(character);
}

// given a DOM table row to remove, delete it and its Character
function removeRow(tr) {
  table.removeCharacter(tr.rowIndex-1);
  populatePage();
}

function removeNPCsOnPage() {
  table.removeNPCs();
  populatePage();
}

// rolls initiative for all characters in table#initiative
function rollForCharactersOnPage() {
  table.rollForCharacters();
  populatePage();
}

function editModifierOnPage(td) {
  // add rolling input to the td
  let rolling = document.createElement("input");
  rolling.id = "editMod";
  rolling.type = "number";
  rolling.placeholder = "0";
  rolling.classList.add("form-control");

  rolling.value = td.innerText;                     // set the value to the current modifier
  td.innerHTML = "";                                // clear the cell's contents
  rolling.focusout = function() { saveMod(this); }; // save on focusout
  td.appendChild(rolling);

  rolling.focus(); // focus on the rolling input
}

// saves a DEX modifier edit to the Character in the table.
function saveMod(rollingInput) {
  var cIndex = rollingInput.parentNode.parentNode.rowIndex-1;
  table.getCharacter(cIndex).setMod(rollingInput.value);

  // set the dex modifier in the table to whatever it is on the character; remove rolling input
  rollingInput.parentNode.innerHTML = table.getCharacter(cIndex).mod;
}

// saves a name edit to the Character in the table
function saveName(td) {
  var tdName = td.innerHTML;
  var cIndex = td.parentNode.rowIndex-1;

  table.getCharacter(cIndex).setName(tdName);
}
