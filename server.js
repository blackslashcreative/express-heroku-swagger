import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import morgan from 'morgan';
import { Low, JSONFile } from 'lowdb';

// DB Setup
const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Initialize express web server
const app = express();

// Configure express with middleware // morgan logs http requests
app.use(morgan('common'));

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Custom middleware
app.use((req, res, next) => {
  // return res.send('I did not execute my route handler function');
  // console.log(req);
  // console.log(res);
  console.log('Hello from middleware!');
  const currentUnixTime = Date.now();
  const currentTime = new Date(currentUnixTime);
  console.log('Time:', currentTime.toString());
  next();
})

// Route functions
app.get('/api/characters', async (req, res) => {
  await db.read();
  res.json(db.data);
});

app.post('/api/characters', async (req, res) => {
  console.log(req.body);
  db.data.characters.push(req.body);
  await db.write();
  res.json(db.data);
});

const PORT = process.env.PORT ||  3000;

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});