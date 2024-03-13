const { ObjectId } = require('mongodb');
const { connectToMongoDB, getCollection } = require('./controller.js');

// Archive a task instead of deleting
const archiveTask = async (id) => {
  let client;
  try {
    client = await connectToMongoDB();
    const collection = await getCollection(client, 'tasks');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status: 'archive' } });
    if (result.modifiedCount === 0) {
      throw new Error('No such task found');
    }
    return result.modifiedCount; // Return the number of modified documents (should be 1)
  } catch (error) {
    console.error('Error archiving task:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};

// Set a task as Active
const setActiveTask = async (id) => {
  let client;
  try {
    client = await connectToMongoDB();
    const collection = await getCollection(client, 'tasks');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status: 'active' } });
    if (result.modifiedCount === 0) { 
      throw new Error('No such task found');
    }
    return result.modifiedCount; // Return the number of modified documents (should be 1)
  } catch (error) {
    console.error('Error setting task as active:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};

// Update a task
const updateTask = async (id, updatedTask) => {
  let client;
  try {
    client = await connectToMongoDB();
    const collection = await getCollection(client, 'tasks');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });
    if (result.modifiedCount === 0) {
      throw new Error('No such task found');
    }
    return result.modifiedCount; // Return the number of modified documents (should be 1)
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};


module.exports = {
  archiveTask,
  setActiveTask,
  updateTask,
};