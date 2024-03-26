import express from "express";
import cors from "cors";
import api from "./routers/api.js";

const app = express();

app.use(express.json({ limit: "100mb" }));

app.use("/api", cors(), api);

export default app;
