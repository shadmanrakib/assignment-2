/** @type {NodeListOf<HTMLElement>} */
const dropdowns = document.querySelectorAll(".dropdown");

/**
 * @param {HTMLElement} dropdownElem
 */
function closeDropdown(dropdownElem) {
  dropdownElem.setAttribute("data-open", "false");
}

/**
 * @param {HTMLElement} dropdownElem
 */
function openDropdown(dropdownElem) {
  dropdownElem.setAttribute("data-open", "true");
}

/**
 * @param {HTMLElement} dropdownElem
 */
function toggleDropdown(dropdownElem) {
  const prevOpen = dropdownElem.getAttribute("data-open");
  if (!prevOpen || prevOpen === "false") {
    openDropdown(dropdownElem);
  } else {
    closeDropdown(dropdownElem);
  }
}

dropdowns.forEach((dropdown) => {
  // add toggling of menu

  /** @type {NodeListOf<HTMLButtonElement>} */
  const triggers = dropdown.querySelectorAll("button.dropdown-trigger");
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => toggleDropdown(dropdown));
  });

  // if we click out or lose focus, we should close the dropdown
  document.addEventListener("focusout", (e) => {
    if (!dropdown.contains(e.relatedTarget)) {
      closeDropdown(dropdown);
    }
  });
  document.addEventListener("mousedown", (e) => {
    if (!dropdown.contains(e.target)) {
      closeDropdown(dropdown);
    }
  });
});
