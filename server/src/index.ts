import express from "express";
import animalRoutes from './routes/animal.routes';
import enclosureRoutes from './routes/enclosure.routes';
import enclosureStaffRoutes from './routes/enclosureStaff.routes';
import feedingRoutes from './routes/feedingRecord.routes';
import healthCheckRoutes from './routes/healthRecord.routes';

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
