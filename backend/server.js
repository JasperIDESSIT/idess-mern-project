require('dotenv').config()

const express = require('express');
const { MongoClient } = require('mongodb');
const taskRoutes = require('./routes/tasks');

const uri = 'mongodb://localhost:4000';

// for my express app
const app = express();

// for my middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/tasks', taskRoutes);

// connecting my backend to MongoDB
async function connectToMongoDB() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
}

async function startServer() {
    try {
        const client = await connectToMongoDB();
            app.locals.db = client.db(); 

        const port = process.env.PORT || 4000;
        
            app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

startServer();
