// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3500;

// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
  
// });

// app.get('/about', (req, res) =>{
// res.send('This is R:T. Orddy')
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });




import express, { application, query, request, response } from "express";

const app =express();

app.use(express.json())
const PORT = process.env.PORT || 3200;

const users = [
    { 'id': 1, name: 'Alice', 'age':20},
    { 'id': 2, name: 'Bob' , 'age':35},
    { 'id': 3, name: 'Charlie', 'age':30 },
    { 'id': 4, name: 'Charlio', 'age':25 }
];



app.get("/api/users", (request, response)=>{
    console.log(request.query);
    const {query: { filter, value },
    
    }  = request;
    if (filter  && value) {
      
        const filteredUsers = users.filter(user => user[filter].includes(value));
        return response.json(filteredUsers);
    }

    return response.json(users);


});

app.post("/api/users", (request,response)=>{
    const { body } = request;
    console.log(body);
    const newUser = { id:users[users.length - 1].id+1, ...body }
    users.push(newUser);
    return response.status(201).send(newUser);
});

app.put("/api/users/:id", (request, response)=>{

    const { body, 
            params: { id },
    
    } = request
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.status(400);

    const findUserIndex = users.findIndex((user) => user.id === parsedId)

    if (findUserIndex === -1) return response.status(404);

    users[findUserIndex] ={id: parsedId, ...body }
    return response.sendStatus(200)



})

app.patch('/api/users/:id', (request, response) => {
const { body, 
        params: { id }
} = request;

const parsedId = parseInt(id);
if (isNaN(parsedId)) return response.status(400);

const findUserIndex = users.findIndex((user) => user.id === parsedId);
if(findUserIndex === -1) return response.status(404);
users[findUserIndex] ={ ...users[findUserIndex],  ...body }
return response.status(200).send(users[findUserIndex]);

})

app.get("/api/users/:id", (request, response)=>{
     
    const parsedId = parseInt(request.params.id)
    console.log(parsedId);
    if (isNaN(parsedId)) {
        return response.status(400).send({msg: "Bad request. Inavlid ID"})
    }
    const findUser = users.find((user)=> user.id ===parsedId);
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser)



})

app.delete("/api/users/:id", (request, response) =>{
    const { 
        params: { id },
} = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.status(400);
    const findUserIndex = users.findIndex((user) => user.id === parsedId);
    if(findUserIndex === -1) return response.status(404);

    users.splice(findUserIndex, 1);
    return response.sendStatus(200)

})

app.listen(PORT, () =>{
    console.log(`Running on ${PORT}`);
})