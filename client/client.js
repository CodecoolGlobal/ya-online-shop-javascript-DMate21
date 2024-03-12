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

function displayPlants(plants, parent) {
  const cartDiv = appendElement(parent, "div", "cart");
  const plantsDiv = appendElement(cartDiv, "div", "plantsDiv", "Your cart: ");
  const totalPriceDiv = appendElement(cartDiv, "div", "total");
  let totalPrice = 0;
  const plantsObject = {};
  plants.forEach((plant) => {
    const currentPlant = appendElement(parent, "div", "plants", plant.name, {id: plant.id});
    appendElement(currentPlant, "img", null, null, {src: plant.pic});
    const button = appendElement(currentPlant, "button", "cartButton", "Add to cart");
    plantsObject[plant.name] = 1;
    plantsObject[plant.price] = plant.price;
    button.addEventListener("click", () => {
      totalPrice += plant.price;
      totalPriceDiv.textContent = `Total: ${totalPrice.toFixed(2)}`;
      if (!document.getElementById(plant.name)) {
        appendElement(plantsDiv, "li", null, plant.name, {id: plant.name});
        appendElement(plantsDiv, "ul", null, `quantity: ${plantsObject[plant.name]}`, {id: `quant${plant.name}`});
        appendElement(plantsDiv, "ul", null, `price: ${plantsObject[plant.price].toFixed(2)}`, {id: `price${plant.name}`});
      } else {
        plantsObject[plant.name]++;
        plantsObject[plant.price] += plant.price;
        document.getElementById(`quant${plant.name}`).textContent = `quantity: ${plantsObject[plant.name]}`;
        document.getElementById(`price${plant.name}`).textContent = `price: ${plantsObject[plant.price].toFixed(2)}`;
      }
    });
  });
}


async function main() {
  const rootElement = document.querySelector("#root");
  const allPlants = await fetchData("/api/plants/");
  displayPlants(allPlants, rootElement);
}
main();
