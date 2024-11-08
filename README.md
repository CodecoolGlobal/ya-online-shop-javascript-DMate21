# Plant Shop Project

A simple plant shop application with a frontend and backend built using **Express** for the server and **HTML**, **CSS**, and **JavaScript** for the frontend. The app allows users to browse plants, add them to a cart, and perform checkout operations. There is also an admin page where you can manage plants.

## Features

- **Frontend**:
  - View a list of available plants.
  - Add plants to the shopping cart.
  - View cart details (total price, items).
  - Checkout page with a form for customer information.

- **Admin Page**:
  - The admin page allows plant management (view, add, update, delete plants).
  - Admins can see the plant data and update or remove plants from the list.

- **Backend**:
  - API to fetch and manage plant data.
  - API to handle adding/removing plants, and managing the cart.
  - Checkout process that stores customer and cart data.

## Installation

1. **Clone the Repository**:
```bash
  git clone https://github.com/CodecoolGlobal/ya-online-shop-javascript-DMate21
  ```
```bash
   cd ya-online-shop-javascript-DMate21
   ```
2. **Install Dependencies:**
 Make sure you have Node.js installed. Then, run the following command to install the required dependencies:
```bash
npm install
```
3. **Running the Project**
Start the Express Server: To run the backend server, use the following command:

```bash
node server.js
```
This will start the server at http://localhost:6969.

Access the Frontend: Open a web browser and visit http://localhost:6969/shop to access the frontend application.

Access the Admin Page: Open a web browser and visit http://localhost:6969/admin to access the admin page, where you can manage the plants.

## Backend API Endpoints

- **The backend provides the following API endpoints**:
  - GET /api/plants: Fetches a list of all plants.
  - GET /api/plant/:id: Fetches a single plant by its ID.
  - POST /api/plant/: Adds a new plant.
  - PUT /api/plant/:id: Updates the details of a plant.
  - DELETE /api/plant/:id: Deletes a plant by its ID.
  - POST /api/checkout: Processes the cart and stores it in cart.json.