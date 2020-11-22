const express = require("express");

const { errorHandlerMiddleware } = require("./middlewares/http-error");
const sequelize = require("./utils/database");
const userRoutes = require("./routes/user");
const User = require("./models/user");
const Survey = require("./models/survey");

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/users", userRoutes);

User.hasMany(Survey);

app.use((req, res, next) => {
  next(new Httperror("Page not found", 404));
});

app.use(errorHandlerMiddleware);

sequelize
  .sync({ force: true })
  .then((response) => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log("Server up on port ", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
