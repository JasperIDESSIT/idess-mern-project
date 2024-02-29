const express = require('express')
// const Task = require('../models/taskModel')
const {
    createTask,
    getActiveTasks,
    getArchiveTasks,
    getTasks,
    getTask,
    deleteTask,
    archiveTask,
    setActiveTask,
    updateTask
} = require('../controllers/taskController')

const router = express.Router()

// format: method->url->function

// GET all tasks
router.get('/', getTasks)

// GET all ACTIVE tasks
router.get('/active/', getActiveTasks)

// GET all ARCHIVE tasks
router.get('/archive/', getArchiveTasks)

// GET single task
router.get('/view/:id', getTask)

// POST a new task
router.post('/', createTask)

// DELETE a task
router.delete('/:id', deleteTask)

// Archive a task instead of deleting
router.patch('/archive/:id', archiveTask)

// Set a task as active
router.patch('/active/:id', setActiveTask)

// UPDATE a task
router.patch('/update/:id', updateTask)

module.exports = router