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
