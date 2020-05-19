const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

//db connection
require('./database/connection');

const Controller = require('./Controller');
const controller = new Controller();

app.get('/', (req, res) => {
    controller.getAuthors(null, res);
});

app.get('/api/courses/:id', (req, res) => {
    controller.getAuthors(req.params.id, res);
});

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);

    if(error) return res.status(400).send(error);
        controller.createAuthor(req.body.name, res);
});

app.put("/api/courses/:id", (req, res) =>{
    const {error} = validateCourse(req.body);

    if(error){
        res.status(400).send(error);
    }
    controller.updateAuthor(req.params.id, req.body, res);

});

app.delete('/api/courses/:id', (req, res) => {
    controller.deleteAuthor(req.params.id, res);
});

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to the port ${port}...`));