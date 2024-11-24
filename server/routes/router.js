const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

router.get("/getData", async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).json({ message: "all users", data: allUsers });
  } catch (error) {
    res.status(404).json({ message: "error while getting users", err: error });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, age, mobile, work, address, description } = req.body;

  if (!name || !email || !age || !mobile || !work || !address || !description) {
    res.status(404).json("please fill the data!!");
  } else {
    try {
      const preUser = await users.findOne({ email: email });
      if (preUser) {
        res
          .status(404)
          .json({ message: "this user and email already exists.", err: email });
      } else {
        const addUser = new users(req.body);
        await addUser.save();
        res
          .status(201)
          .json({ message: "user added successfully!!", user: addUser });
      }
    } catch (error) {
      res.status(404).json({ message: "error while adding user", err: error });
    }
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const individualUser = await users.findById({ _id: id });
    res.status(200).json({ message: "single user is", user: individualUser });
  } catch (error) {
    res
      .status(404)
      .json({ message: "error in getting single user is", err: error });
  }
});

router.patch("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(201)
      .json({ message: "updated successfully", data: updatedUser });
  } catch (error) {
    res.status(404).json({ message: "error while updating user", err: error });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await users.findByIdAndDelete(id);
    if (!response) {
      return req.status(404).json({ message: "User Not FOUND" });
    }
    res.status(201).json({ message: "User deleted Successfully" });
  } catch (error) {
    console.log("error while deleting user", error);
    res
      .status(404)
      .json({ message: "Internal Server Error while Deleting User." });
  }
});

module.exports = router;
