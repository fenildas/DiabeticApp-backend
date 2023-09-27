require('dotenv').config();
import cors from "cors";

import express, { json } from "express";
import { set, connect, connection } from "mongoose";

import http from "http";

set("strictQuery", false);
const app = express();

app.use(json());
app.use(cors());

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const uri = process.env.URI;
// const db_username = process.env.USERNAME;
// const db_password = process.env.PASSWORD;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

import userCarbsData from "./routes/userCarbsRoute";
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api", userCarbsData);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("MongoDB connected successfully");
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
