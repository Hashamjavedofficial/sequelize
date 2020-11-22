const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const Survey = require("../models/survey");
const User = require("../models/user");
const Httperror = require("../helper/http-error");

router.post("/newSurvey/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: {
          [Op.eq]: req.params.id,
        },
      },
    });
    const survey = await user.createSurvey({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json({ message: "Survey created", survey });
  } catch (e) {
    return next(
      new Httperror("Ops something went wrong, try again later", 500)
    );
  }
});

module.exports = router;
