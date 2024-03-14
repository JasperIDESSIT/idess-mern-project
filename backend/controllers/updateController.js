const { ObjectId } = require('mongodb');
const { connectToMongoDB, getCollection } = require('./controller.js');

const archiveTask = async (id) => {
  let client;
  try {
    client = await connectToMongoDB();
    const collection = await getCollection(client, 'tasks');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status: 'archive' } });
    if (result.modifiedCount === 0) {
      throw new Error('No such task found');
    }
    return result.modifiedCount;
  } catch (error) {
    console.error('Error archiving task:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};

const setActiveTask = async (id) => {
  let client;
  try {
    client = await connectToMongoDB();
    const collection = await getCollection(client, 'tasks');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status: 'active' } });
    if (result.modifiedCount === 0) { 
      throw new Error('No such task found');
    }
    return result.modifiedCount;
  } catch (error) {
    console.error('Error setting task as active:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};


const updateTask = async (id, updatedFields) => {
  let client;
  try {
      client = await connectToMongoDB();
      const collection = await getCollection(client, 'tasks');
      const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });
      if (result.modifiedCount === 0) {
          throw new Error('No such task found');
      }
      return result.modifiedCount;
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