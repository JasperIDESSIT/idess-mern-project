const { ObjectId } = require('mongodb');
const { connectToMongoDB, getCollection } = require('./controller.js');

// get all tasks
const getTasks = async () => {
  let client;
  try {
    client = await connectToMongoDB();
    console.log('Retrieving all tasks from collection');
    const collection = await getCollection(client, 'tasks');
    const tasks = await collection.find({}).sort({ createdAt: -1 }).toArray();
    console.log('Retrieved all tasks from collection');
    console.log(tasks)
    return tasks;
  } catch (error) {
    console.error('Error getting tasks:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};

// get all tasks that are active
const getActiveTasks = async () => {
  let client;
  try {
    client = await connectToMongoDB();
    const collection = await getCollection(client, 'tasks');
    const tasks = await collection.find({ status: 'active' }).sort({ createdAt: -1 }).toArray();
    return tasks;
  } catch (error) {
    console.error('Error getting active tasks:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};

// get all tasks that are archived
const getArchiveTasks = async () => {
  let client;
  try {
    client = await connectToMongoDB();
    const collection = await getCollection(client, 'tasks');
    const tasks = await collection.find({ status: 'archive' }).sort({ createdAt: -1 }).toArray();
    return tasks;
  } catch (error) {
    console.error('Error getting active tasks:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};

// get a single task by ID
const getTask = async (id) => {
  let client;
  try {
    client = await connectToMongoDB();
    const collection = await getCollection(client, 'tasks');
    console.log('Searching for task with ID:', id);
    const task = await collection.findOne({ _id: new ObjectId(id) });
    return task;
  } catch (error) {
    console.error('Error getting task by ID:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};

module.exports = {
  getActiveTasks,
  getArchiveTasks,
  getTasks,
  getTask,
};