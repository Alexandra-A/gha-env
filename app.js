import bodyParser from "body-parser";
import express from "express";
import eventsRoutes from "./routes/events.js";

const app = express();

app.use(bodyParser.json());

app.use("/api", eventsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;