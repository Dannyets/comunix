import express from "express";
import bodyParser from "body-parser";

import { router } from "./router";
import { errorMiddleware } from "./middlewares";
import { initDb } from "./db";

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, PORT } = process.env;

export const app = express();
const port = PORT ?? 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);
app.use(errorMiddleware);

app.listen(port, async () => {
  await initDb(DB_NAME, DB_HOST, DB_USER, DB_PASSWORD);
  console.log(`Example app listening at http://localhost:${port}`);
});
