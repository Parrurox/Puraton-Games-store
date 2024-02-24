import express from "express";

import { Game } from "../models/gameModel.js";

const router = express.Router();

// Route for saving a new game---------------------------
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.developer || !req.body.publicationYear) {
      return res.status(400).send({
        message: "All fields are required: title, developer, publicationYear",
      });
    }
    const newGame = {
      title: req.body.title,
      developer: req.body.developer,
      publicationYear: req.body.publicationYear,
    };
    const game = await Game.create(newGame);

    return res.status(201).send(game);
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

// Route for getting all games---------------------------
router.get("/", async (req, res) => {
  try {
    const games = await Game.find({});
    return res.status(200).json({
      count: games.length,
      data: games,
    });
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

// Route for individual game from db by id---------------------------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    return res.status(200).json(game);
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

//Route for updating a game by id---------------------------

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.developer || !req.body.publicationYear) {
      return res.status(400).send({
        message: "All fields are required: title, developer, publicationYear",
      });
    }

    const { id } = req.params;

    const result = await Game.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.status(200).send({ message: "Game updated successfully" });
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

// Route for deleting a game by id---------------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Game.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.status(200).send({ message: "Game deleted successfully" });
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

export default router;
