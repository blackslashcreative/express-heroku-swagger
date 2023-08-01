import fs from 'fs';
import express from 'express';
import morgan from 'morgan';

import characterRoutes from './routes/characters.js';

// Swagger 
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
      info: {
          title: "Nintendo Characters API",
          version: "1.0.0"
      }
  },
      apis: ["server.js"]
}


// Initialize express web server
const app = express();

// Configure express with middleware // morgan logs http requests
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Swagger API documentation 
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// Character Routes 
app.use(characterRoutes);

const PORT = process.env.PORT ||  3000;

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});