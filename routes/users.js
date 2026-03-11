const express = require('express');
const router = express.Router();

const userController = require('../controllers/index');

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.postUser);
router.put("/:id", userController.updateUserById);
router.delete('/:id', userController.deleteUser)

module.exports = router;