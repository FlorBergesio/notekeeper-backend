const express = require('express');
const app = express();
const router = express.Router();

const response = require('./network/response');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

router.get('/', ( req, res ) => {
    res.send('Notekeeper');
});

router.get('/notes', ( req, res ) => {
    response.success( req, res, 'List of notes', 'Displaying list of notes' );
});

router.post('/notes', ( req, res ) => {
    response.success( req, res, 'Created successfully', `Note created succesfully with the text "${req.body.text}"`, 201 );
});

router.delete('/notes', ( req, res ) => {
    if(req.query.error == "ok") {
        response.error( req, res, 'ERROR', 'Simulating error', 400 );
    } else {
        response.success( req, res, 'Note deleted', 'Note deleted successfully' );

    }
});

app.listen(3000);
console.log('App is listening in http://localhost:3000');
