let count = 1;

function createCell() {
  const elem = document.createElement("div");
  elem.className = "cell";
  elem.style = "--cell-color: #fff";
  elem.id = `cell-${count}`;
  elem.innerHTML = count;
  count++;

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
  th.appendChild(createDeleteButton(`delete-row-${columns}`));
  rowElem.appendChild(th);

  for (let i = 0; i < columns; i++) {
    rowElem.insertCell().appendChild(createCell());
  }

  updateGridLayout(rows + 1, columns);
}

function createDeleteButton(id) {
  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.id = id;
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
  th.appendChild(createDeleteButton(`delete-col-${columns}`));
  rowHeadElements.appendChild(th);

  /** @type {NodeListOf<HTMLTableRowElement>} */
  const rowBodyElements = grid.querySelectorAll("tbody > tr");

  for (let i = 0; i < rowBodyElements.length; i++) {
    rowBodyElements[i].insertCell().appendChild(createCell());
  }

  updateGridLayout(rows, columns + 1);
}

function deleteRow() {}
