const db = require('../connection/connectdb');
const { ObjectId } = require('mongodb');

const getUsers = async (req, res) => {
    //swagger.tags=['Users']
    try {
        const database = db.getDb();

        const users = await database.collection('users').find({}).toArray();

        res.status(200).json(users);

    }  catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
}

const getUserById = async (req, res) => {
    //swagger.tags=['Users']
    try {
        const database = db.getDb();

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user id format" });
        }

        const userId = new ObjectId(req.params.id);

        const user = await database.collection('users').findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    }  catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "An error occurred while fetching user." });
    }
}

const postUser = async (req, res) => {
    //swagger.tags=['Users']
    try {
        const database = db.getDb();

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await database.collection('users').insertOne(user);

        res.status(201).json({
            message: "User created succesfully",
            id: response.insertedId
        });
    } catch (error) {
        console.error("Error fetching user: ", error)
        res.status(500).json({ error: "An error ocurred while creating user."})
    }
}

const updateUserById = async (req, res) => {
    //swagger.tags=['Users']
    try {
        const database = db.getDb();

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user id format" });
        }

        const userId = new ObjectId(req.params.id)

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }

        const response = await database
            .collection('users')
            .replaceOne({ _id: userId }, user)

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User edited succesfully",
            modified: response.modifiedCount
        });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occurred while updating the user." });
    }
}

const deleteUser = async (req, res) => {
    //swagger.tags=['Users']
    try {
        const database = db.getDb();

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user id format" });
        }

        const userId = new ObjectId(req.params.id)

        const user = await database
            .collection('users')
            .deleteOne({ _id: userId })

        if (user.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted succesfully",
            delete: user.deletedCount
        })
    } catch (error) {
        console.error("Error deleting user: ", error)
        res.status(500).json({ error: "An error ocurred while deleting user"})
    }
}

module.exports = {
    getUsers,
    getUserById,
    postUser,
    updateUserById,
    deleteUser
}