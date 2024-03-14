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
        const { title, content, tags, createdAt } = req.body;
        const status = 'active';
        const task = await createTask(title, content, status, tags, createdAt);
        res.status(200).json({ success: 'Successfully created!' });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.get('/active/', async (req, res) => {
    try {
        const tasks = await getActiveTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch active tasks' });
    }
});

router.get('/archive/', async (req, res) => {
    try {
        const tasks = await getArchiveTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch archive tasks' });
    }
});

router.get('/view/:id', async (req, res) => {
    const taskId = req.params.id; 
    try {
        const task = await getTask(taskId);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the task' });
    }
});

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
