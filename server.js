require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projectRoute");
const userRoutes = require("./routes/userRoute");

// express app
const app = express();

// port
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

// connecting to the db
mongoose.set("strictQuery", false); // optional
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listening for the requests
    app.listen(port, () => {
      console.log(`connected to the db & listening on the port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
