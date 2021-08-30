const express = require('express');
const app = express();
const db = require('./db');
const router = require('./network/routes');

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router(app);

app.listen(3000);
console.log('App is listening in http://localhost:3000');
