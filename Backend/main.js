import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { productos } from './helpers/functionsBack.js';
import { methods as authentication } from './controllers/authentication_controller.js';
// import { methods as authorization } from './middlewares/authorization.js';

const app = express();
const port = 4000;

const DB_host = process.env.DB_host;
const DB_user = process.env.DB_user;
const DB_password = process.env.DB_password;
const DB_database = process.env.DB_database;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

app.listen(port, () => {
    console.log(`Executing at http://localhost:${port}`);
});

// authorization.authorization,
app.get('/productos', async (_req, res) => {
    const listProducts = await productos(DB_host, DB_user, DB_password, DB_database);
    res.send(listProducts);
});

// app.get("/",authorization.soloPublico, (req,res)=> res.sendFile(__dirname + "./index.html"));
app.post("/api/register", authentication.register);
app.post("/api/login", authentication.login);
