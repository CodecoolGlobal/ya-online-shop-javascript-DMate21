import express from 'express';


import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataJsonPath = join(__dirname, 'data.json');

const app = express();
const PORT = 6969;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

async function readPlants() {
  const plantsJson = await readFile('./data.json', 'utf-8');
  return JSON.parse(plantsJson);
}

app.get('/api/plants', async (req, res) => {
  const plants = await readPlants();
  return res.json(plants);
});

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/client.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/admin.html'));
});


app.get('/api/plant/:id', async (req, res) => {
  const plants = await readPlants();
  const decodedId = decodeURIComponent(req.params.id);
  const currentplant = plants.find((plant) => plant.id === Number(decodedId));

  if (!currentplant) {
    res.status(404).json({ error: 'Plant not found' });
  }
  res.json(currentplant);
});

app.delete('/api/plant/:id', async (req, res) => {
  const plants = await readPlants();
  const plantId = parseInt(req.params.id);
  const plantIndex = plants.findIndex((plant) => plant.id === plantId);

  if (plantIndex === -1) {
    return res.send(plants);
  }
  plants.splice(plantIndex, 1);
  await writeFile(dataJsonPath, JSON.stringify(plants, null, 2));
  return res.send(plants);
});

app.put('/api/plant/:id', async (req, res) => {
  const plants = await readPlants();
  const plantId = parseInt(req.params.id);
  const plantIndex = plants.findIndex((plant) => plant.id === plantId);
  const replacement = req.body;
  plants.splice(plantIndex, 1, replacement);
  await writeFile(dataJsonPath, JSON.stringify(plants, null, 2));
  res.send(plants[plantIndex]);
});

app.post('/api/plant/', async (req, res) => {
  const plants = await readPlants();
  const plantId = parseInt(req.params.id);
  const plantIndex = plants.findIndex((plant) => plant.id === plantId);
  const replacement = req.body;
  plants.push(replacement);
  await writeFile(dataJsonPath, JSON.stringify(plants, null, 2));
  res.send(plants[plantIndex]);
});

app.patch('/api/plant/:id/price', async (req, res) => {
  const plants = readPlants();
  const plantId = parseInt(req.params.id);
  const plantIndex = plants.findIndex((plant) => plant.id === plantId );
  const replacement = req.body;
  plants[plantIndex].price = replacement;
  await writeFile(dataJsonPath, JSON.stringify(plants), null, 2);
  res.send(plants[plantIndex]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
