const express = require('express');
const app = express();
const router = express.Router();

app.use(router);

router.get('/', ( req, res ) => {
    res.send('Notekeeper');
});

router.get('/notes', ( req, res ) => {
    res.send('Notes list');
});

router.post('/notes', ( req, res ) => {
    res.send('Note added');
});

router.delete('/notes', ( req, res ) => {
    res.send('Note deleted');
});

app.listen(3000);
console.log('App is listening in http://localhost:3000');
