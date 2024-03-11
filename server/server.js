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

app.get('/shop', async (req, res) => {
  res.sendFile(path.join(__dirname, '../client/client.html'));
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
