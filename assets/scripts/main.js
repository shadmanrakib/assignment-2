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
  const grid = document.querySelector(".grid");
  const style = window.getComputedStyle(grid);

  const rows = Number.parseInt(style.getPropertyValue("--rows"));
  const columns = Number.parseInt(style.getPropertyValue("--columns"));

  for (let i = 0; i < columns; i++) {
    grid.appendChild(createCell());
  }

  updateGridLayout(rows + 1, columns);
}

function addColumn() {
  const grid = document.querySelector(".grid");
  const style = window.getComputedStyle(grid);

  const rows = Number.parseInt(style.getPropertyValue("--rows"));
  const columns = Number.parseInt(style.getPropertyValue("--columns"));

  for (let i = 0; i < rows; i++) {
    const idx = (columns + 1) * (i + 1) - 1;
    insertElemAtIndex(grid, createCell(), idx);
  }

  updateGridLayout(rows, columns + 1);
}
