import express from "express";
import bodyParser from "body-parser";
import eventsRoutes from "./routes/events.js";

const app = express();
app.use(bodyParser.json());
app.use("/api", eventsRoutes);

export default app; // just export the app, no listen()
