const express = require('express');
const app = express();
const db = require('./db');
const router = require('./network/routes');
const dotenv = require('dotenv');
dotenv.config();

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

router(app);

const port_number = ( process.env.PORT ? process.env.PORT : 3000)

app.listen(port_number);
console.log(`App is listening in http://localhost:${port_number}`);
