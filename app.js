const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const i18n = require("i18n");
const PORT = process.env.PORT || 3500;
const errorHandler = require("./middleware/error");
const projects = require("./routes/projects");
const default_features = require("./routes/default_features");
const estimated_features = require("./routes/estimated_features");
const admin = require("./routes/admin");
const auth = require("./routes/auth");
const ErrorResponse = require("./utils/errorResponse");

const app = express();
dotenv.config();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization",
    "accept-language"
  );
  next();
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/admin", admin);
app.use("/api/v1/projects", projects);
app.use("/api/v1/default_features", default_features);
app.use("/api/v1/estimated_features", estimated_features);

app.all("*", async (req, res, next) => {
  const err = new ErrorResponse(
    `${req.originalUrl} does not exist on the server`,
    404
  );
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
