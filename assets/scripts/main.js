// we keep it at one since 0 is already used by the first cell
let cellId = 1;

function createCell() {
  const elem = document.createElement("div");
  elem.className = "cell";
  elem.style = "--cell-color: #fff";
  elem.id = `cell-${cellId}`;
  elem.innerHTML = cellId;
  cellId++;

  return elem;
}

function updateGridLayout(rows, columns) {
  /** @type {HTMLDivElement} */
  const grid = document.querySelector(".grid");
  grid.style = `--rows: ${rows}; --columns: ${columns}`;
}

function insertElemAtIndex(parent, element, index) {
  // invalid
  if (index > parent.children.length) {
    return;
  }

  // If index is last position, just append
  if (index === parent.children.length) {
    parent.appendChild(element);
    return;
  }

  // Insert before the element at the specified index
  const referenceNode = parent.children[index];
  parent.insertBefore(element, referenceNode);
}

function addRow() {
  /** @type {HTMLTableElement} */
  const grid = document.querySelector(".grid");
  const style = window.getComputedStyle(grid);

  const rows = Number.parseInt(style.getPropertyValue("--rows"));
  const columns = Number.parseInt(style.getPropertyValue("--columns"));

  const rowElem = grid.insertRow();
  const th = document.createElement("th");
  th.appendChild(createDeleteButton(rows, "delete-row-btn"));
  rowElem.appendChild(th);

  for (let i = 0; i < columns; i++) {
    rowElem.insertCell().appendChild(createCell());
  }

  updateGridLayout(rows + 1, columns);
}

function createDeleteButton(idx, className) {
  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.dataset["idx"] = idx;
  btn.className = className;
  return btn;
}

function addColumn() {
  /** @type {HTMLTableElement} */
  const grid = document.querySelector(".grid");
  const style = window.getComputedStyle(grid);

  const rows = Number.parseInt(style.getPropertyValue("--rows"));
  const columns = Number.parseInt(style.getPropertyValue("--columns"));

  /** @type {HTMLTableRowElement} */
  const rowHeadElements = grid.querySelector("thead > tr");
  const th = document.createElement("th");
  th.appendChild(createDeleteButton(columns, "delete-col-btn"));
  rowHeadElements.appendChild(th);

  /** @type {NodeListOf<HTMLTableRowElement>} */
  const rowBodyElements = grid.querySelectorAll("tbody > tr");

  for (let i = 0; i < rowBodyElements.length; i++) {
    rowBodyElements[i].insertCell().appendChild(createCell());
  }

  updateGridLayout(rows, columns + 1);
}

function deleteRow(bodyRowIdx) {
  /** @type {HTMLTableElement} */
  const grid = document.querySelector(".grid");
  const style = window.getComputedStyle(grid);

  const rows = Number.parseInt(style.getPropertyValue("--rows"));
  const columns = Number.parseInt(style.getPropertyValue("--columns"));

  // we add 1 because delete row includes the head row
  // and we need to use an offset as a result
  grid.deleteRow(bodyRowIdx + 1);

  updateGridLayout(rows - 1, columns);
}

function deleteColumn(columnIdx) {
  /** @type {HTMLTableElement} */
  const grid = document.querySelector(".grid");
  const style = window.getComputedStyle(grid);

  const rows = Number.parseInt(style.getPropertyValue("--rows"));
  const columns = Number.parseInt(style.getPropertyValue("--columns"));

  /** @type {HTMLTableRowElement} */
  const rowHeadElements = grid.querySelector("thead > tr");
  // we add one to offset initial delete row column
  const deleteButtonCell = rowHeadElements.cells[columnIdx + 1];
  rowHeadElements.removeChild(deleteButtonCell);

  /** @type {NodeListOf<HTMLTableRowElement>} */
  const rowBodyElements = grid.querySelectorAll("tbody > tr");
  for (let j = 0; j < rowBodyElements.length; j++) {
    // we add one to offset initial delete row column
    rowBodyElements[j].deleteCell(columnIdx + 1);
  }

  updateGridLayout(rows, columns - 1);
}

// Add this function to your JavaScript file
function setupEventListeners() {
  const grid = document.querySelector(".grid");

  // Use event delegation to handle all delete button clicks
  grid.addEventListener("click", function (event) {
    const target = event.target;

    /** @type {HTMLTableElement} */
    const grid = document.querySelector(".grid");
    const style = window.getComputedStyle(grid);

    const rows = Number.parseInt(style.getPropertyValue("--rows"));
    const columns = Number.parseInt(style.getPropertyValue("--columns"));

    // delete row button
    if (target.classList.contains("delete-row-btn")) {
      // should not delete since theres at most (and only) one row
      if (rows <= 1) {
        return;
      }

      // we get the index by finding the tr that is an ancestor and its
      // position amongst other tr
      // this assumes the ancestor is always the closest
      const row = target.closest("tr");
      const tbody = row.parentElement;
      const rowIndex = Array.from(tbody.children).indexOf(row);
      deleteRow(rowIndex);
    }

    // delete column button
    if (target.classList.contains("delete-col-btn")) {
      // should not delete since theres at most (and only) one column
      if (columns <= 1) {
        return;
      }

      // we get the index by finding the th that is an ancestor and its
      // position amongst other th
      // this assumes the ancestor is always the closest
      const cell = target.closest("th");
      const headerRow = cell.parentElement;
      // we need to offset the first column which is reserved for delete row buttons
      // so we subtract by 1 to get the index excluding the first col
      const colIndex = Array.from(headerRow.children).indexOf(cell) - 1;
      deleteColumn(colIndex);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});

function colorSelection(){
  color = document.getElementById("selectColor").value;
  if (color != "None"){
    console.log(color)
    return color
  }
  else{
    return -1
  }  
}

function colorAll() {
  const returnedColor = colorSelection();  
  if (color !== -1) {
    const cells = document.querySelectorAll('.cell');
    
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = returnedColor;  
    }
  }
}
