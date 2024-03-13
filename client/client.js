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
  const checkoutButton = appendElement(cartDiv, "button", ["checkout", "hidden"], "Go to checkout");
  const allAddedPlantsDiv = appendElement(cartDiv, "div", ["plantsDiv", "hidden"]);
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
    const infoButton = appendElement(currentPlant, "button", "infoButton", "Information about the plant");
    plantsObject[plant.name] = 1;
    plantsObject[plant.price] = plant.price;
    button.addEventListener("click", () => {
      totalPrice += plant.price;
      totalPriceDiv.textContent = `Total: ${totalPrice.toFixed(2)}`;
      counter++;
      counterElement.textContent = `Items: ${counter}`;
      if (!document.getElementById(plant.name)) {
        const addedPlants = appendElement(allAddedPlantsDiv, "div", "added");
        appendElement(addedPlants, "img", null, null, {src: plant.pic});
        appendElement(addedPlants, "li", null, plant.name, {id: plant.name});
        appendElement(addedPlants, "ul", null, `quantity: ${plantsObject[plant.name]}`, {id: `quant${plant.name}`});
        appendElement(addedPlants, "ul", null, `price: ${plantsObject[plant.price].toFixed(2)}`, {id: `price${plant.name}`});
        // appendElement(addedPlants, "button", "delete", "Remove from cart");
      } else {
        plantsObject[plant.name]++;
        plantsObject[plant.price] += plant.price;
        document.getElementById(`quant${plant.name}`).textContent = `quantity: ${plantsObject[plant.name]}`;
        document.getElementById(`price${plant.name}`).textContent = `price: ${plantsObject[plant.price].toFixed(2)}`;
      }
    });
  });
  cartListener(imgElement, totalPriceDiv, allAddedPlantsDiv);
}

function cartListener(imgElement, totalPriceDiv, plantsDiv) {
  const allPlantsDivs = document.querySelector(".plants");
  const rootElement = document.querySelector("#root");
  const checkoutButton = document.querySelector(".checkout");
  const back = appendElement(rootElement, "button", ["back", "hidden"], "Continue shopping");
  imgElement.addEventListener("click", () => {
    allPlantsDivs.classList.add("hidden");
    plantsDiv.classList.remove("hidden");
    totalPriceDiv.classList.remove("hidden");
    back.classList.remove("hidden");
    checkoutButton.classList.remove("hidden");
  });
}

function handelBackButton() {
  const plantsDiv = document.querySelector(".plantsDiv");
  const totalPriceDiv = document.querySelector(".total");
  const back = document.querySelector(".back");
  const checkoutButton = document.querySelector(".checkout");
  back.addEventListener("click", () => {
    plantsDiv.classList.add("hidden");
    totalPriceDiv.classList.add("hidden");
    const allPlantsDivs = document.querySelector(".plants");
    allPlantsDivs.classList.remove("hidden");
    back.classList.add("hidden");
    checkoutButton.classList.add("hidden");
  });
}

function displayPlantData() {
  const infoButtons = document.querySelectorAll(".infoButton");
  infoButtons.forEach((infoButton) => {
    infoButton.addEventListener("click", async (event) => {
      const plant = await fetchData(`/api/plant/${event.target.parentElement.id}`);
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
      const hideButton = appendElement(modalContent, "button", "hideButton", "Hide");
      modal.style.display = "block";
      hideButton.addEventListener("click", () => {
        modal.textContent = "";
        modal.style.display = "none";
      });
    });
  });
}


// function removeItemFromCartHandler(plantsObject, plant, removeButton) {
//   removeButton.addEventListener("click", () => {
//     plantsObject[plant]--;
//     plantsObject[plant.price] -= plant.price;
//     document.getElementById(`quant${plant.name}`).textContent = `quantity: ${plantsObject[plant.name]}`;
//     document.getElementById(`price${plant.name}`).textContent = `price: ${plantsObject[plant.price].toFixed(2)}`;
//   });
// }



async function main() {
  const rootElement = document.querySelector("#root");
  const allPlants = await fetchData("/api/plants/");
  displayPlants(allPlants, rootElement);
  handelBackButton();

  displayPlantData();
}
main();
