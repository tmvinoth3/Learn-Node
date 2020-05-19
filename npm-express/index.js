const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

var courses = [
    {id:1, name:"course1"},
    {id:2, name:"course2"},
    {id:3, name:"course3"}
];

app.get('/', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params);
    //res.send(req.query);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Entered id is not fouond");
    else res.send(course);
});

app.post('/api/courses', (req, res) => {
    //const result = validateCourse(req.body);

    // if(!req.body.name || req.body.name.length < 3)
    // {
    //     res.status(400).send("Bad Request name is mandatory and should be greter than 3 chars");
    // }

    const {error} = validateCourse(req.body);

    if(error){
        res.status(400).send(result.error);
    }
    else{
        const course = {
            id: courses.length+1,
            name: req.body.name
        };
        courses.push(course);
        res.send(course);
    }
});

app.put("/api/courses/:id", (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Entered id is not found");

    const {error} = validateCourse(req.body);

    if(error){
        res.status(400).send(error);
    }

    course.name = req.body.name;

    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Entered id is not found");
    else{
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        res.send('deleted successfully');
    }
});

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to the port ${port}...`));