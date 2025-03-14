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
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});
