import express from 'express';
import routes from './routes/routes.js'
import connection from './config/db.js';
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from "url"

dotenv.config()
const port = process.env.PORT
const app = express();

app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/', routes)

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
