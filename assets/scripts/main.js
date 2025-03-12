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

