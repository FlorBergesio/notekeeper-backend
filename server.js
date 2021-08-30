const express = require('express');
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

router.get('/', ( req, res ) => {
    res.send('Notekeeper');
});

router.get('/notes', ( req, res ) => {
    console.log(req.query);
    res.send('Notes list');
});

router.post('/notes', ( req, res ) => {
    console.log(req.body);
    res.send(`Note added: "${req.body.text}"`);
});

router.delete('/notes', ( req, res ) => {
    res.send('Note deleted');
});

app.listen(3000);
console.log('App is listening in http://localhost:3000');
