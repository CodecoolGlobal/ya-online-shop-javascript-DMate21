import express from 'express';

const app = express();

import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataJsonPath = join(__dirname, 'data.json');

const  PORT = 6969; 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});