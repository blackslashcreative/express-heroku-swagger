import { Router } from 'express';

import redisClient from '../redisClient.js';

const router = Router();

router.get('/api/characters', async (req, res) => {
  const characters = await redisClient.lRange('characters', 0, -1);
  console.log(characters);
  const data = characters.map((character) => {
    const char = character.split(':');
    return {
      name: char[0],
      game: char[1]
    };
  });  
  res.json(data);
});

router.post('/api/characters', async (req, res) => {
  console.log(req.body);
  const newChar = await redisClient.lPush('characters', `${req.body.name}:${req.body.game}`);
  console.log(newChar);
  res.json(newChar);
});

router.delete('/api/characters', async (req, res) => {
  console.log(req.body);
  const characters = await redisClient.lRange('characters', 0, -1);
  let key;
  characters.forEach((character) => {
    if(character.includes(req.body.name)) {
      key = character;
    }
  });
  const result = await redisClient.lRem('characters', 0, key);
  console.log(result);
  res.json(result);
});

export default router;