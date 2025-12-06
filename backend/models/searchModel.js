import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
  searchTerm: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 },
  movie_id: Number,
  poster_url: String,
});

export default mongoose.model("Search", searchSchema);
