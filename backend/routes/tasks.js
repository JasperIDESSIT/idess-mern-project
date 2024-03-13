const express = require('express');
const router = express.Router();

const {
    createTask,
} = require('../controllers/createController');

const {
  getActiveTasks,
  getArchiveTasks,
  getTasks,
  getTask
} = require('../controllers/readController');

const {
  archiveTask,
  setActiveTask,
  updateTask
} = require('../controllers/updateController');

const {
  deleteTask,
} = require('../controllers/deleteController');

// POST a new task
router.post('/create-task', async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const status = 'active';
        const task = await createTask(title, content, status, tags);
        res.status(200).json({ success: 'Successfully created!' });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// GET all ACTIVE tasks
router.get('/active/', async (req, res) => {
    try {
        const tasks = await getActiveTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch active tasks' });
    }
});

// GET all ARCHIVE tasks
router.get('/archive/', async (req, res) => {
    try {
        const tasks = await getArchiveTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch archive tasks' });
    }
});

// GET single task
router.get('/view/:id', async (req, res) => {
    const taskId = req.params.id; 
    try {
        const task = await getTask(taskId);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the task' });
    }
});

// DELETE a task
// router.delete('/:id', deleteTask);
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteTask(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Archive a task instead of deleting
// router.patch('/archive/:id', archiveTask);
router.patch('/archive/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        const updatedTask = await archiveTask(taskId);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error archiving task:', error);
        res.status(500).json({ error: 'Failed to archive task' });
    }
});

// Set a task as active
// router.patch('/active/:id', setActiveTask);
router.patch('/active/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        const updatedTask = await setActiveTask(taskId);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error setting task as active:', error);
        res.status(500).json({ error: 'Failed to set task as active' });
    }
});

// UPDATE a task
// router.patch('/update/:id', updateTask);
router.patch('/update/:id', async (req, res) => {
    const taskId = req.params.id;
    const { title, content } = req.body; 

    try {
        const result = await updateTask(taskId, { title, content });
        if (result) {
            res.status(200).json({ success: 'Updated successfully' });
        } else {
            res.status(404).json({ error: 'No such task found' });
        }
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});


module.exports = router;
