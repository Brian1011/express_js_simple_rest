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
    if(!course) res.status(404).send('The course with the given ID was not found')
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})

// PORT
const port = process.env.PORT || 3000
app.listen(3000, ()=>console.log(`Listening on port ${port}`))