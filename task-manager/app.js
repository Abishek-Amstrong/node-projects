const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config(); // To pass the connection string from env file

// middleware
app.use(express.static('./public'));
app.use(express.json()); // parses incoming JSON requests and puts the parsed data in req.body.

// routes

app.use('/api/v1/tasks', tasks);

// app.get('api/v1/tasks')  get all the tasks
// app.post('api/v1/tasks')  To create a new task
// app.get('api/v1/tasks/:id')  To get a task by ID
// app.patch('api/v1/tasks/:id')  To edit a task
// app.delete('api/v1/tasks/:id')  To delete a task

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();