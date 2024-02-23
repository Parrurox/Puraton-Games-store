import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    developer: { type: String, required: true },
    publicationYear: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Game = mongoose.model("Cat", gamesSchema);
