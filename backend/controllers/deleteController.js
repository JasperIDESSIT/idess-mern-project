const { ObjectId } = require('mongodb');
const { connectToMongoDB, getCollection } = require('./controller.js');

// Delete a task
const deleteTask = async (id) => {
  let client;
  try {
    client = await connectToMongoDB();
    const collection = await getCollection(client, 'tasks');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('No such task found');
    }
    return result.deletedCount;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};

module.exports = {
  deleteTask,
};
