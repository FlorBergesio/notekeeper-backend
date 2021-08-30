const express = require('express');
const app = express();
const router = require('./network/routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router(app);

app.listen(3000);
console.log('App is listening in http://localhost:3000');
