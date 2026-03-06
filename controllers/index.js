const db = require('../connection/connectdb');
const { ObjectId } = require('mongodb');

const getUsers = async (req, res) => {
    try {
        const database = db.getDb();
        const users = await database.collection('users').find({}).toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);

    }  catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const database = db.getDb();

        const user = await database.collection('users').findOne({ _id: userId });

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);

    }  catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "An error occurred while fetching user." });
    }
}

module.exports = {
    getUsers,
    getUserById
}