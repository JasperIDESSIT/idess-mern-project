const { MongoClient } = require('mongodb');

require('dotenv').config()

const dbName = process.env.DB_NAME;

const connectToMongoDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    console.log('taskController connected to database');
    return client;
  } catch (error) {
    console.error('Error connecting taskController to MongoDB:', error);
    throw error;
  }
};

const getCollection = async (client, collectionName) => {
  try {
    const db = client.db(dbName);
    console.log('Collection retrieved');
    return db.collection(collectionName);
  } catch (error) {
    console.error('Error getting collection:', error);
    throw error;
  }
};

module.exports = {
    connectToMongoDB,
    getCollection,
};