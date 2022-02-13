const elems = {};
let filterTerm = "";

elems.input = document.querySelector("input");
elems.hobbyItems = document.querySelectorAll(".hobby-item");

elems.input.addEventListener("input", onInputChange);

function onInputChange(event) {
  filterTerm = event.target.value.toLowerCase();

  for (hobbyItem of elems.hobbyItems) {
    hobbyItem.hidden = !hobbyItem.innerText.toLowerCase().includes(filterTerm);
  }
}

elems.arrowSelectableElems = [elems.input, ...elems.hobbyItems];
let lastSelected = 0;
let numberOfElems = elems.arrowSelectableElems.length;

document.addEventListener("keyup", onKeyup);

function onKeyup(event) {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    const direction = event.key === "ArrowDown" ? 1 : -1;
    for (let i = 0; i < elems.arrowSelectableElems.length; i++) {
      let j = modulo(direction * (i + 1) + lastSelected, numberOfElems);
      let currentElem = elems.arrowSelectableElems[j];
      console.log(j);
      if (!currentElem.hidden) {
        lastSelected = j;
        let elemToFocus =
          currentElem === elems.input
            ? elems.input
            : currentElem.querySelector("input");
        elemToFocus.focus();
        break;
      }
    }
  }
}

elems.input.addEventListener("focus", () => (lastSelected = 0));
elems.availableHobbiesLegend = document.querySelector(
  ".available-hobbies__legend"
);

function modulo(a, n) {
  return ((a % n) + n) % n;
}

elems.hobbyItemInputs = document.querySelectorAll(".hobby-item input");
elems.filterButton = document.querySelector(".filter__button");

for (checkboxInput of elems.hobbyItemInputs) {
  checkboxInput.addEventListener("input", onCheckboxInput);
}

function onCheckboxInput() {
  const checkedItems = Array.from(elems.hobbyItems).filter(
    (elem) => elem.querySelector("input").checked
  );

  const checkedItemTexts = checkedItems.map((item) =>
    item.querySelector("label").innerText.trim()
  );

  elems.availableHobbiesLegend.innerHTML = `Available hobbies (${checkedItems.length} selected})`;
  elems.filterButton.innerHTML = composeFilteringButtonText(checkedItemTexts);
}

function composeFilteringButtonText(checkboxLabels) {
  const numberOfOptions = checkboxLabels.length;
  const copy = JSON.parse(JSON.stringify(checkboxLabels));
  const last = copy.pop();
  const rest = copy;

  const part1 = `${checkboxLabels.length} ${
    numberOfOptions === 1 ? "option" : "options"
  } selected: `;
  const part2 = `${rest.length ? rest.join(", ") + " and " : ""}${
    last ? last : ""
  }. `;
  const part3 = "Click to clear.";

  return part1 + part2 + part3;
}
