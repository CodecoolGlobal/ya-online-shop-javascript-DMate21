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
    if (typeof classes === 'string' ){
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

function displayPlants(plants) {
  plants.forEach((plant) => {
    appendElement(document.getElementById('root'), 'div', 'plants', plant.name, {id: plant.id});
    appendElement(document.getElementById(`${plant.id}`), "img", null, null, {src: plant.pic});
  });
}

async function main() {
  const allPlants = await fetchData('/api/plants');
  displayPlants(allPlants);
}
main();
