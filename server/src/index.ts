import express from "express";
<<<<<<< HEAD
import { errorHandler } from "./middleware/error";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
=======
import animalRoutes from './routes/animal.routes';
import enclosureRoutes from './routes/enclosure.routes';
import enclosureStaffRoutes from './routes/enclosureStaff.routes';
import feedingRoutes from './routes/feedingRecord.routes';
import healthCheckRoutes from './routes/healthRecord.routes';
>>>>>>> api_and_schema

const app = express();
app.use(express.json());

app.use(animalRoutes);
app.use(enclosureRoutes);
app.use(enclosureStaffRoutes);
app.use(feedingRoutes);
app.use(healthCheckRoutes);

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
