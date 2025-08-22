import express from "express";
import { errorHandler } from "./middleware/error";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
