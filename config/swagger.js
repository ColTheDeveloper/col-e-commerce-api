import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Use this if you are working with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
);


const swaggerSetup = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default swaggerSetup