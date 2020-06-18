const express = require('express')
const app = express();

app.get('/', (request, response)=>{
    response.send('Hello World!!!');
})

app.get('/api/courses', (request, response)=>{
    response.send([1,2,3,5])
})

app.get('/api/courses/:year/:month', (req, res)=>{
    res.send(req.query)
})

// PORT
const port = process.env.PORT || 3000
app.listen(3000, ()=>console.log(`Listening on port ${port}`))