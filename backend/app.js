import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import searchRoutes from "./routes/searchRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({
  origin: "*",
  methods: "GET,POST"
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/movieDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
