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

async function putPlant(id, replacement) {
  await fetch (`/api/plant/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(replacement)
  })
}

async function deleteUserById(id) {
  const httpResponse = await fetch(
    `/api/plant/${id}`, 
    {
      method: 'DELETE'
    }
  );

  const deletedPlant = await httpResponse.json();
  return deletedPlant;
}


async function main() {
  const allPlants = await fetchData("/api/plants");
  allPlants.forEach((plant) => {
    appendElement(document.getElementById("root"), "div", "plants", plant.name, {id: plant.id})
  })
}
main();