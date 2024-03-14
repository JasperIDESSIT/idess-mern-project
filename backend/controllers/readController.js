const { ObjectId } = require('mongodb');
const { connectToMongoDB, getCollection } = require('./controller.js');

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