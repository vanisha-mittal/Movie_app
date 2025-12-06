import express from "express";
import Search from "../models/searchModel.js";

const router = express.Router();

router.post("/update", async (req, res) => {
  try {
    const { searchTerm, movie } = req.body;

    let doc = await Search.findOne({ searchTerm });

    if (doc) {
      doc.count += 1;
      await doc.save();
    } else {
      await Search.create({
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: movie?.image?.medium || movie?.image?.original || "",

      });
    }
    console.log("Received update:", req.body);
    res.json({ success: true });

  } catch (err) {
    console.error("Error inserting/updating:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/trending", async (req, res) => {
  try {
    const trending = await Search.find().sort({ count: -1 }).limit(10);
    res.json(trending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
