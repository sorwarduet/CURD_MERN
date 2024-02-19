const express = require("express");
const router = express.Router();


//controller import
const userController = require("../controllers/userController");

//user route
router.get("/users", userController.getUsers);
router.post("/create-user", userController.createUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);

module.exports = router;
