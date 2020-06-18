const Joi = require('joi')
const express = require('express')
const app = express();
app.use(express.json());

const courses = [
    {id:1, name:'Course 1'},
    {id:2, name:'Course 2'},
    {id:3, name:'Course 3'}
]

app.get('/', (request, response)=>{
    response.send('Hello World!!!');
})

app.get('/api/courses', (request, response)=>{
    response.send(courses)
})

app.get('/api/courses/:id', (req, res)=>{
    let course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found')
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body); // object destructuring
    if(error)return res.status(400).send(error.details)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    let course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found')

    const result = validateCourse(req.body);
    const {error} = validateCourse(req.body); // object destructuring
    if(error){
        res.status(400).send(error.details)
        return
    }

    course.name = req.body.name;
    res.send(course);
})


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return  Joi.validate(course, schema);
}


// PORT
const port = process.env.PORT || 3000
app.listen(3000, ()=>console.log(`Listening on port ${port}`))