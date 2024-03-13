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
  const cartDiv = appendElement(parent, "div", "cart", null);
  const imgElement = appendElement(cartDiv, "img", null, null, {src: "/plants/shopping cart.png"});
  const addedPlantsDiv = appendElement(cartDiv, "div", ["plantsDiv", "hidden"]);
  const totalPriceDiv = appendElement(cartDiv, "div", ["total", "hidden"]);
  let counter = 0;
  const counterElement = appendElement(cartDiv, "ul", "counter", `Items: ${counter}`);
  let totalPrice = 0;
  const plantsObject = {};
  const allPlants = appendElement(parent, "div", "plants");
  plants.forEach((plant) => {
    const currentPlant = appendElement(allPlants, "div", "plants", plant.name, {id: plant.id});
    appendElement(currentPlant, "img", null, null, {src: plant.pic});
    const button = appendElement(currentPlant, "button", "cartButton", "Add to cart");
    const infoButton = appendElement(currentPlant, "button", "infoButton", "Informations");
    displayPlantData(currentPlant, infoButton);
    plantsObject[plant.name] = 1;
    plantsObject[plant.price] = plant.price;
    button.addEventListener("click", () => {
      totalPrice += plant.price;
      totalPriceDiv.textContent = `Total: ${totalPrice.toFixed(2)}`;
      counter++;
      counterElement.textContent = `Items: ${counter}`;
      if (!document.getElementById(plant.name)) {
        appendElement(addedPlantsDiv, "li", null, plant.name, {id: plant.name});
        appendElement(addedPlantsDiv, "ul", null, `quantity: ${plantsObject[plant.name]}`, {id: `quant${plant.name}`});
        appendElement(addedPlantsDiv, "ul", null, `price: ${plantsObject[plant.price].toFixed(2)}`, {id: `price${plant.name}`});
      } else {
        plantsObject[plant.name]++;
        plantsObject[plant.price] += plant.price;
        document.getElementById(`quant${plant.name}`).textContent = `quantity: ${plantsObject[plant.name]}`;
        document.getElementById(`price${plant.name}`).textContent = `price: ${plantsObject[plant.price].toFixed(2)}`;
      }
    });
  });
  cartListener(imgElement, totalPriceDiv, addedPlantsDiv);
}

function cartListener(imgElement, totalPriceDiv, plantsDiv) {
  const allPlantsDivs = document.querySelector(".plants");
  const rootElement = document.querySelector("#root");
  const back = appendElement(rootElement, "button", ["back", "hidden"], "Continue shopping");
  imgElement.addEventListener("click", () => {
    allPlantsDivs.classList.add("hidden");
    plantsDiv.classList.remove("hidden");
    totalPriceDiv.classList.remove("hidden");
    back.classList.remove("hidden");
  });
}

function handelBackButton() {
  const plantsDiv = document.querySelector(".plantsDiv");
  const totalPriceDiv = document.querySelector(".total");
  const back = document.querySelector(".back");
  back.addEventListener("click", () => {
    plantsDiv.classList.add("hidden");
    totalPriceDiv.classList.add("hidden");
    const allPlantsDivs = document.querySelector(".plants");
    allPlantsDivs.classList.remove("hidden");
    back.classList.add("hidden");
  });
}

function displayPlantData(currentPlant, infoButton) {
  infoButton.addEventListener("click", async () => {
    const plant = await fetchData(`/api/plant/${currentPlant.id}`);
    const modal = appendElement(document.querySelector("#root"), "div", "modal", null, {id: "modal"});
    const modalContent = appendElement(modal, "div", "modalContent", null, {id: "modalContent"});
    appendElement(modalContent, "h2", null, plant.name);
    appendElement(modalContent, "p", null, `Id: ${plant.id}`);
    appendElement(modalContent, "p", null, `Description: ${plant.description}`);
    appendElement(modalContent, "p", null, `Price: ${plant.price}`);
    appendElement(modalContent, "p", null, `Stock: ${plant.stock}`);
    appendElement(modalContent, "p", null, `Water-requirement: ${plant["water_requirement"]}`);
    appendElement(modalContent, "p", null, `Light-requirement: ${plant["light_requirement"]}`);
    appendElement(modalContent, "img", null, null, {src: plant.pic});
    modal.style.display = "block";
  });
}

// function hideModal() {
//   const modal = document.getElementById("modal");
//   modal.style.display = "none";
//   isOpen = false;
// }

// window.addEventListener("click", (event) => {
//   const modal = document.getElementById("modal");
//   if (event.target !== modal) {
//     modal.hide();
//   }
// });

async function main() {
  const rootElement = document.querySelector("#root");
  const allPlants = await fetchData("/api/plants/");

  displayPlants(allPlants, rootElement);
  handelBackButton();
}
main();
