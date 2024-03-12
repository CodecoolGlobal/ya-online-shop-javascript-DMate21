async function fetchData (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function appendElement (parent, tagName, classes, text, attributes) {
  const element = document.createElement(tagName);
  parent.appendChild(element);
  if (classes) {
    if (typeof classes === "string" ){
      classes = [classes];
    }
    for (const className of classes){
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

async function postPlant(id, replacement) {
  await fetch (`/api/plant/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(replacement),
  });
}


async function deletePlantById(id) {
  await fetch(`/api/plant/${id}`, {method: "DELETE"});
}

function addDeleteButtonListener(deleteButton){
  deleteButton.addEventListener("click", async (event) => {
    await deletePlantById(event.target.id);
    displayPlants();
  });
}


function displayInputs(parent) {
  const form = appendElement(parent, "form", null, null, {id: "form"});
  appendElement(form, "input", "input", null, {id: "price"}  );
  appendElement(form, "button", "priceButton", "submit price");
  appendElement(form, "input", "input", null, {id: "stock"} );
  appendElement(form, "button", "stockButton", "submit stock");
}

function displayPlantData(parent, plant) {
  appendElement(parent, "li", null, `id: ${plant.id}`);
  appendElement(parent, "li", null, `name: ${plant.name}`);
  appendElement(parent, "li", null, `description: ${plant.description}`);
  appendElement(parent, "li", null, `price: ${plant.price}`);
  appendElement(parent, "li", null, `stock: ${plant.stock}`);
  appendElement(parent, "li", null, `water requirement: ${plant.water_requirement}`);
  appendElement(parent, "li", null, `light requirement: ${plant.light_requirement}`);
  appendElement(parent, "img", null, null, {src: plant.pic});
}

async function displayPlants () {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = "";
  const allPlants = await fetchData("/api/plants");
  allPlants.forEach((plant) => {
    const currentplant = appendElement(rootElement, "div", "plants", plant.name, {id: plant.id});
    const deleteButton = appendElement(currentplant, "button", "deleteButton", "delete", {id: plant.id});
    displayPlantData(currentplant, plant);
    displayInputs(rootElement);
    addDeleteButtonListener(deleteButton);
  });
}


function main() {
  displayPlants();
}
main();
