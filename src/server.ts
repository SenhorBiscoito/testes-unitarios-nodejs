import express from "express";

import { accountRoutes } from "./routes/account.routes";

const app = express();

app.use(express.json());
app.use(accountRoutes);

app.get("/", (request, response) => {
  return response.json({ status: "Online" });
});

app.listen(3333, () => {
  console.log("🚀 Server is running");
});
