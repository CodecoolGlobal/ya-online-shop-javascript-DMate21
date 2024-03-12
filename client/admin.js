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
  const elementName = document.createElement(tagName);
  parent.appendChild(elementName);
  if (classes) {
    if (typeof classes === "string" ){
      classes = [classes];
    }
    for (const className of classes){
      elementName.classList.add(className);
    }
  }
  if (text) {
    elementName.textContent = text;
  }
  for (const attribute in attributes) {
    elementName[attribute] = attributes[attribute];
  }
  return elementName;
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

async function deleteUserById(id) {
  const httpResponse = await fetch(
    `/api/plant/${id}`,
    {
      method: "DELETE",
    },
  );

  const deletedPlant = await httpResponse.json();
  return deletedPlant;
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

function displayPlants (parent, plants) {
  plants.forEach((plant) => {
    const currentplant = appendElement(parent, "div", "plants", plant.name, {id: plant.id});
    appendElement(currentplant, "button", "deleteButton", "delete");
    displayPlantData(currentplant, plant);
    displayInputs(parent);
  });
}


async function main() {
  const rootElement = document.getElementById("root");
  const allPlants = await fetchData("/api/plants");
  displayPlants(rootElement, allPlants);
}
main();
