const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({}); // Reference - https://mongoosejs.com/docs/queries.html
//         res.status(200).json({ tasks });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
//     // res.send('get all tasks');
// }

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

// const createTask = async (req, res) => {
//     try {
//         const task = await Task.create(req.body);
//         res.status(201).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
//     // res.json(req.body);
// }

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

// const getTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params;
//         const task = await Task.findOne({ _id: taskID }); // Reference - https://mongoosejs.com/docs/api.html#model_Model-findOne

//         if (!task) {
//             return res.status(404).json({ msg: `No tasks with id: ${taskID}` });
//         }

//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
//     // res.json({ id: req.params.id });
// }

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID }); // Reference - https://mongoosejs.com/docs/api.html#model_Model-findOne

    if (!task) {
        return next(createCustomError(`No tasks with id: ${taskID}`, 404));
        // return res.status(404).json({ msg: `No tasks with id: ${taskID}` });
    }

    res.status(200).json({ task });
});

// const updateTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params;
//         const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
//             new: true,
//             runValidators: true
//         }); // Reference - https://mongoosejs.com/docs/api.html#model_Model-findOneAndUpdate

//         if (!task) {
//             return res.status(404).json({ msg: `No tasks with id: ${taskID}` });
//         }
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
//     // res.send('Update task');
// }

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    });

    if (!task) {
        return next(createCustomError(`No tasks with id: ${taskID}`, 404));
        // return res.status(404).json({ msg: `No tasks with id: ${taskID}` });
    }
    res.status(200).json({ task });
});

const editTask = async (req, res) => { // Put request
    try {
        const { id: taskID } = req.params;
        const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
            overwrite: true // To overwrite the existing task - To differentiate from patch request
        }); // Reference - https://mongoosejs.com/docs/api.html#model_Model-findOneAndUpdate

        if (!task) {
            return next(createCustomError(`No tasks with id: ${taskID}`, 404));
            // return res.status(404).json({ msg: `No tasks with id: ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
    // res.send('Update task');
}

// const deleteTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params;
//         const task = await Task.findOneAndDelete({ _id: taskID }); // Reference - https://mongoosejs.com/docs/api.html#model_Model-findOneAndDelete

//         if (!task) {
//             return res.status(404).json({ msg: `No tasks with id: ${taskID}` });
//         }

//         // res.status(200).json({ task });
//         // res.status(200).send();
//         res.status(200).json({ task: null, status: 'success' });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
//     // res.send('Delete a single task');
// }

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID }); // Reference - https://mongoosejs.com/docs/api.html#model_Model-findOneAndDelete

    if (!task) {
        return next(createCustomError(`No tasks with id: ${taskID}`, 404));
        // return res.status(404).json({ msg: `No tasks with id: ${taskID}` });
    }

    res.status(200).json({ task: null, status: 'success' });
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask
}