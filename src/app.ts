require("module-alias/register");
import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import projects from "routes/projects";
import default_features from "routes/default_features";
import estimated_features from "routes/estimated_features";
import admin from "routes/admin";
import auth from "routes/auth";
import { errorHandler } from "middleware/error";
import ErrorResponse from "utils/errorResponse";
const PORT = process.env.PORT || 3500;

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, accept-language"
  );
  next();
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/admin", admin);
app.use("/api/v1/projects", projects);
app.use("/api/v1/default_features", default_features);
app.use("/api/v1/estimated_features", estimated_features);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  const err: Error = new ErrorResponse(
    `${req.originalUrl} does not exist on the server`,
    404
  );
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
