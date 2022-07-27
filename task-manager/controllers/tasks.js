const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}); // Reference - https://mongoosejs.com/docs/queries.html
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
    // res.send('get all tasks');
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
    // res.json(req.body);
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID }); // Reference - https://mongoosejs.com/docs/api.html#model_Model-findOne

        if (!task) {
            return res.status(404).json({ msg: `No tasks with id: ${taskID}` });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
    // res.json({ id: req.params.id });
}

const updateTask = (req, res) => {
    res.send('Update task');
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID }); // Reference - https://mongoosejs.com/docs/api.html#model_Model-findOneAndDelete

        if (!task) {
            return res.status(404).json({ msg: `No tasks with id: ${taskID}` });
        }

        // res.status(200).json({ task });
        // res.status(200).send();
        res.status(200).json({ task: null, status: 'success' });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
    // res.send('Delete a single task');
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}