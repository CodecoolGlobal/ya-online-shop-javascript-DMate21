/* eslint-disable max-len */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function appendElement(parent, tagName, classes, text, attributes) {
  const element = document.createElement(tagName);
  parent.appendChild(element);
  if (classes) {
    if (typeof classes === "string") {
      classes = [classes];
    }
    for (const className of classes) {
      element.classList.add(className);
    }
  }
  if (text) {
    element.textContent = text;
  }
  for (const attribute in attributes) {
    element[attribute] = attributes[attribute];
  }
  return element;
}

async function patchPlant(id, updates, type) {
  await fetch(`/api/plant/${id}/${type}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
}

function addPatchEventListener(button, input, currentPlant, type){
  button.addEventListener("click", async () => {
    const update = {
      [type]: parseInt(input.value),
    };
    await patchPlant(currentPlant.id, update, type);
    displayPlants();
  });
}

async function postPlant(replacement) {
  await fetch("/api/plant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(replacement),
  });
}

function addPostEventListener() {
  const form = document.getElementById("new-plant");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("input-name");
    const descriptionInput = document.getElementById("input-description");
    const priceInput = document.getElementById("input-price");
    const stockInput = document.getElementById("input-stock");
    const waterInput = document.getElementById("input-water");
    const lightInput = document.getElementById("input-light");
    const picInput = document.getElementById("input-pic");

    const newPlant = {
      id: "",
      name: nameInput.value,
      description: descriptionInput.value,
      price: priceInput.value,
      stock: stockInput.value,
      water_requirement: waterInput.value,
      light_requirement: lightInput.value,
      pic: picInput.value,
    };
    await postPlant(newPlant);
    displayPlants();
  });
}

async function deletePlantById(id) {
  await fetch(`/api/plant/${id}`, { method: "DELETE" });
}

function addDeleteButtonListener(deleteButton, currentplant) {
  deleteButton.addEventListener("click", async () => {
    await deletePlantById(currentplant.id);
    displayPlants();
  });
}


function displayInputs(parent) {
  const form = appendElement(parent, "form", null, null, { id: "form" });
  const priceInput = appendElement(form, "input", "priceInput", null, { id: "price" });
  const priceButton = appendElement(form, "button", "priceButton", "submit price");
  const stockInput = appendElement(form, "input", "stockInput", null, { id: "stock" });
  const stockButton = appendElement(form, "button", "stockButton", "submit stock");
  priceInput.placeholder = "Edit plant price";
  stockInput.placeholder = "Edit stock";
  addPatchEventListener(priceButton, priceInput, parent, "price");
  addPatchEventListener(stockButton, stockInput, parent, "stock");

}

function displayPlantData(parent, plant) {
  appendElement(parent, "li", null, `id: ${plant.id}`);
  appendElement(parent, "li", null, `name: ${plant.name}`);
  appendElement(parent, "li", null, `description: ${plant.description}`);
  appendElement(parent, "li", null, `price: ${plant.price}`);
  appendElement(parent, "li", null, `stock: ${plant.stock}`);
  appendElement(parent, "li", null, `water requirement: ${plant.water_requirement}`);
  appendElement(parent, "li", null, `light requirement: ${plant.light_requirement}`);
  appendElement(parent, "img", null, null, { src: plant.pic });
}

async function displayPlants() {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = "";
  const allPlants = await fetchData("/api/plants");
  allPlants.forEach((plant) => {
    const currentplant = appendElement(rootElement, "div", "plants", plant.name, { id: plant.id });
    const deleteButton = appendElement(currentplant, "button", "deleteButton", "delete");
    displayPlantData(currentplant, plant);
    displayInputs(currentplant);
    addDeleteButtonListener(deleteButton, currentplant);
  });
  return allPlants;
}


function main() {
  displayPlants();
  addPostEventListener();
}
main();
