const mongoose = require('mongoose');

const connectionString = `mongodb+srv://admin:0330@nodeexpresscourse.zvmobyn.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority`;

const connectDB = (url) => {
    return mongoose
        .connect(connectionString, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true });
}

module.exports = connectDB;