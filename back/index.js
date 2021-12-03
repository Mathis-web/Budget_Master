require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const router = require('./app/router');

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`port listening on localhost:${PORT}`)
});