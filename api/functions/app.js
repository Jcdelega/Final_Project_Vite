const express = require('express');
const cors = require('cors')
const serverless = require('serverless-http');

const users = require('../routes/users');
const todos = require('../routes/todos');

/* ESTES ES MI SERVIDOR */
const app = express();

app.use(cors())
app.use(express.json())

console.log("Por cargar las rutas");

app.use('/.netlify/functions/user', users);
app.use('/.netlify/functions/todos', todos);

console.log("Rutas cargadas");

export const handler = serverless(app);

/* const PORT = 3005;

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`)
}) */