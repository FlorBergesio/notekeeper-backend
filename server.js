const express = require('express');
const app = express();

app.use('/', (req, res) => res.send('Initial setup.'));

app.listen(3000);
console.log('App is listening in http://localhost:3000');
