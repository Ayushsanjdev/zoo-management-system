import express from "express";
import { errorHandler } from "./middleware/error";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
