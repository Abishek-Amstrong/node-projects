const getAllTasks = (req, res) => {
    res.send('get all tasks');
}

const createTask = (req, res) => {
    res.send('Create task');
}

const getTask = (req, res) => {
    res.send('Get a single task');
}

const updateTask = (req, res) => {
    res.send('Update task');
}

const deleteTask = (req, res) => {
    res.send('Delete a single task');
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}