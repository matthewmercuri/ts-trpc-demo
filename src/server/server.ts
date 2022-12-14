/* eslint-disable no-console */
import * as path from "path";
import express, { Express } from "express";
import cors from "cors";
import { cleanDataArray, runCsvPipeline } from "./utils.js";

const app: Express = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/historical-data", (req, res) => {
  const { ticker } = req.query;

  runCsvPipeline(
    path.resolve(process.cwd(), "src/server/data", `${ticker}.csv`)
  )
    .then((data) => {
      res.status(200).send(cleanDataArray(data));
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
