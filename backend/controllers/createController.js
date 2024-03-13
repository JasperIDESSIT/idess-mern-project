const { ObjectId } = require('mongodb');
const { connectToMongoDB, getCollection } = require('./controller.js');

// create a new task
const createTask = async (title, content, status, tags) => {
    let client;
    try {
      client = await connectToMongoDB();
      console.log('Connected to MongoDB');
        const collection = await getCollection(client, 'tasks');
            const result = await collection.insertOne({ title, content, status, tags });
            // console.log('Task inserted:', result.ops[0]);
            console.log("Task Created")
            // return result.ops[0]; 
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    } finally { 
      if (client) {
        client.close();
      }
    }
};

module.exports = {
  createTask,
};