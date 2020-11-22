const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const User = require("../models/user");
const Httperror = require("../helper/http-error");

router.post("/newUser", (req, res, next) => {
  const data = req.body;
  User.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    phoneNo: data.phoneNo,
  })
    .then((response) => {
      res.status(201).json({ message: "User created", response: response });
    })
    .catch((error) => {
      console.log(error);
      return next(new Httperror(error.message, 500));
    });
});

router.get("/getUsers", async (req, res, next) => {
  try {
    const users = await User.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json({
      users,
    });

    if (users.length < 1) {
      return next(new Httperror("No user found", 404));
    }
  } catch (e) {
    return next(new Httperror("Something went wrong, try again later", 500));
  }
});

router.get("/getUser/:id", async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "firstName", "email"],
      where: {
        id: req.params.id,
      },
    });

    if (user.length < 1) {
      return next(new Httperror("No user found", 404));
    }
    res.status(200).json({
      user,
    });
  } catch (e) {
    return next(
      new Httperror("Something went wrong, please try again later", 500)
    );
  }
});

router.patch("/getUser/:id", async (req, res, next) => {
  const data = req.body;
  try {
    const user = await User.update(
      {
        email: data.email,
        phoneNo: data.phoneNo,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({ message: "User updated", user });
  } catch (e) {
    return next(
      new Httperror("Ops something went wrong, try again later", 500)
    );
  }
});

router.delete("/:id", async (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      return user.destroy();
    })
    .then((response) => {
      res.status(200).json({ message: "User deleted" });
    })
    .catch((e) => {
      return next(new Httperror("Something went wrong", 500));
    });
});

module.exports = router;
